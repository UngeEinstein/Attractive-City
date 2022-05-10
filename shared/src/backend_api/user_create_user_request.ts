/**
 * A request to create a new user in database
 */

export interface UserCreateUserRequest {
  /**
   * The id associated with the user. (From firebase)
   */
  userId: string;

  /**
   * The email associated with the user.
   */

  email: string | null;
}

export const userCreateUserRequestSchema = {
  $id: "UserCreateUserRequest",
  additionalProperties: false,
  description: "A request to register a user",
  properties: {
    userId: {
      description: "The value used to identify the user",
      type: "string",
    },
    email: {
      description: "The email associated with the current user.",
      type: ["string", "null"],
    },
  },
  required: ["userId"],
  type: "object",
};
