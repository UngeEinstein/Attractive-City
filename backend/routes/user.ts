import Ajv from "ajv";
import { respondInvalidContent, respondWrongContentType } from "../endpoint";
import express from "express";
import { BackendApi } from "shared";
import { userController } from "../user_controller";

const router = express.Router();

const ajv = new Ajv();
const userCreateUserRequestValidate = ajv.compile(
  BackendApi.userCreateUserRequestSchema
);

// Routes:

router.post("/register_user", async (request, response) => {
  if (!request.is("application/json")) {
    respondWrongContentType(response);
    return;
  }

  if (!userCreateUserRequestValidate(request.body)) {
    respondInvalidContent(response, userCreateUserRequestValidate);
    return;
  }

  const registerUserRequest = <BackendApi.UserCreateUserRequest>request.body;

  try {
    await userController.createUser(
      registerUserRequest.userId,
      registerUserRequest.email
    );

    response.status(200).send();
  } catch (error) {
    response.status(400).json({
      error: error,
    });
  }
});

router.get("/user", async (request, response) => {
  response.json(await userController.getUser(String(request.query.userId)));
});

export default router;
