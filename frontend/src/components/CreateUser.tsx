import React, { useState } from "react";
import { Redirect } from "react-router";
import { Button, Form } from "react-bootstrap";
import { useAuthentication } from "../firebase-auth";
import "./CreateUser.css";

interface CreateUserI {
  switchToLogin: () => void;
  lastPath: string;
}

export const CreateUser: React.FC<CreateUserI> = ({
  switchToLogin,
  lastPath,
}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [createUserError, setCreateUserError] = useState<number>(0);
  const { createUser } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (email && password) {
      await createUser(email, password, setCreateUserError);
      if (createUserError === 0) {
        setRedirect(true);
      }
      return;
    }
    return;
  };

  return (
    <div className="create-user-form-container">
      <Form className="create-user-form" onSubmit={handleSubmit}>
        <div className="main-container">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                setCreateUserError(0);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                setCreateUserError(0);
              }}
            />
            {createUserError === 1 ? (
              <Form.Text style={{ color: "red" }}>
                {" "}
                Unable to create user.{" "}
              </Form.Text>
            ) : null}
            {createUserError === 2 ? (
              <Form.Text style={{ color: "red" }}>
                {" "}
                A user already exists for this email.{" "}
              </Form.Text>
            ) : null}
            {createUserError === 3 ? (
              <Form.Text style={{ color: "red" }}>
                {" "}
                Password too weak.{" "}
              </Form.Text>
            ) : null}
          </Form.Group>

          <Button className="button" variant="primary" type="submit">
            Create user
          </Button>
          <Button
            className="already-user-link"
            variant="link"
            onClick={switchToLogin}
          >
            {" "}
            Already a user? Log in{" "}
          </Button>
        </div>
      </Form>

      {redirect ? <Redirect push to={lastPath} /> : null}
    </div>
  );
};
