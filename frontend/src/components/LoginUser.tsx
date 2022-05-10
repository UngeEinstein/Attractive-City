import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthentication } from "../firebase-auth";
import "./LoginUser.css";

interface LoginUserI {
  switchToCreateUser: () => void;
  lastPath: string;
}

export const LoginUser: React.FC<LoginUserI> = ({
  switchToCreateUser,
  lastPath,
}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);
  const [loginError, setLoginError] = useState<number>(0);

  const { loginUser, loginAnonymous } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (email && password) {
      await loginUser(email, password, setLoginError);
      if (!loginError) {
        setRedirect(true);
      }
      return;
    }
  };

  const handleAnonymousSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await loginAnonymous(setLoginError);
    setRedirect(true);
    return;
  };

  useEffect(() => {
    if (redirect) {
      window.location.href = lastPath;
    }
  }, [lastPath, redirect]);

  return (
    <>
      <div className="login-user-form-container">
        <Form className="login-user-form" onSubmit={handleSubmit}>
          <div className="main-container">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  setLoginError(0);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                  setLoginError(0);
                }}
              ></Form.Control>
              {loginError === 1 ? (
                <Form.Text style={{ color: "red" }}>
                  {" "}
                  User does not exist.{" "}
                </Form.Text>
              ) : null}
              {loginError === 2 ? (
                <Form.Text style={{ color: "red" }}>
                  {" "}
                  Incorrect password.{" "}
                </Form.Text>
              ) : null}
              {loginError === 3 ? (
                <Form.Text style={{ color: "red" }}>
                  {" "}
                  Something went wrong.{" "}
                </Form.Text>
              ) : null}
            </Form.Group>

            <Button className="button" variant="primary" type="submit">
              Login
            </Button>
            <Button
              variant="link"
              className="create-user-link"
              onClick={switchToCreateUser}
            >
              No user? Create user
            </Button>
          </div>
        </Form>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Form
          className="login-anonymous-user-form"
          onSubmit={handleAnonymousSubmit}
        >
          <Button className="button" variant="primary" type="submit">
            {" "}
            Anonymous Login{" "}
          </Button>
        </Form>
      </div>
    </>
  );
};
