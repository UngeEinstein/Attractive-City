import React, { useState } from "react";
import { LoginUser } from "../components/LoginUser";
import { CreateUser } from "../components/CreateUser";

export const LoginView = (props: any) => {
  const [showLogin, setShowLogin] = useState<Boolean>(true);
  let lastPath: string = "";
  const setLastPath = (path: string) => {
    lastPath = path;
  };

  //Determines what page the user is sent to after logging in
  try {
    setLastPath(props.location.state.lastPath);
  } catch (e) {
    setLastPath("/");
  }
  const switchView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <LoginUser switchToCreateUser={switchView} lastPath={lastPath} />
      ) : (
        <CreateUser switchToLogin={switchView} lastPath={lastPath} />
      )}
    </div>
  );
};
