import React, { useEffect, useState, FC, useContext } from "react";
import auth from "./firebase-login";
import {
  User,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import userService from "./services/user";
import { BackendApi } from "shared";
import { FirebaseError } from "@firebase/util";

interface Auth {
  currentUser: User | null;
  createUser: (
    email: string,
    password: string,
    setCreateUserError: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  loginUser: (
    email: string,
    password: string,
    setLoginError: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  loginAnonymous: (
    setLoginError: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  getUser: () => User | null;
  logout: () => void;
}

// Context for user login
const AuthenticationContext = React.createContext<Auth>({
  currentUser: null,
  createUser: () => {},
  loginUser: () => {},
  loginAnonymous: () => {},
  getUser: () => null,
  logout: () => {},
});

const AuthenticationProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [awaiting, setAwaiting] = useState<Boolean>(true);

  useEffect(() => {
    const changed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const userRequest: BackendApi.UserCreateUserRequest = {
          userId: user.uid,
          email: user.email,
        };
        userService.createUser(userRequest);
        setAwaiting(false);
      } else {
        setCurrentUser(null);
        setAwaiting(false);
      }
      return changed;
    });
  }, []);

  const getUser = () => {
    return auth.currentUser;
  };

  const createUser = async (
    email: string,
    password: string,
    setCreateUserError: React.Dispatch<React.SetStateAction<number>>
  ) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const userRequest: BackendApi.UserCreateUserRequest = {
        userId: user.user.uid,
        email: user.user.email,
      };
      userService.createUser(userRequest);
      setCurrentUser(user.user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setCreateUserError(2);
        } else if (error.code === "auth/weak-password") {
          setCreateUserError(3);
        } else {
          setCreateUserError(1);
        }
      } else {
        setCreateUserError(1);
      }
    }
  };

  const loginUser = async (
    email: string,
    password: string,
    setLoginError: React.Dispatch<React.SetStateAction<number>>
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          setLoginError(1);
        } else if (error.code === "auth/wrong-password") {
          setLoginError(2);
        }
      } else {
        setLoginError(3);
      }
    }
  };

  const loginAnonymous = async (
    setLoginError: React.Dispatch<React.SetStateAction<number>>
  ) => {
    try {
      const user = await signInAnonymously(auth);
      const userRequest: BackendApi.UserCreateUserRequest = {
        userId: user.user.uid,
        email: null,
      };
      // console.log("UserRequest: ", userRequest);
      userService.createUser(userRequest);

      // console.log("Signed in anonymous user: ", currentUser?.uid);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // console.log("Logged out anonymous user ", currentUser?.uid);
    } catch (error) {
      console.log(error);
    }
  };

  if (awaiting) {
    return <> </>;
  }

  return (
    <AuthenticationContext.Provider
      value={{
        currentUser,
        createUser,
        loginUser,
        loginAnonymous,
        getUser,
        logout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthentication = () => useContext(AuthenticationContext);

export { AuthenticationProvider, useAuthentication };
