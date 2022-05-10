import { ValidateFunction } from "ajv";
import { Response } from "express";

/**
 * Send a response indicating that the request did not have the correct content type – application/json.
 *
 * @param response The object through which a response should be sent.
 */
export const respondWrongContentType = (response: Response) => {
  response.status(400).json({
    message: "Request content type must be application/json.",
  });
};

/**
 * Send a reponse indicating that the content of the request did not match the specifications.
 *
 * @param response The object through which a response should be sent.
 * @param validateFunction Validate function that was used to validate the content that is invalid.
 */
export const respondInvalidContent = (
  response: Response,
  validateFunction: ValidateFunction
) => {
  response.status(400).json({
    errors: validateFunction.errors,
    message: "Request body did not match expected format.",
    schema: validateFunction.schema,
  });
};
