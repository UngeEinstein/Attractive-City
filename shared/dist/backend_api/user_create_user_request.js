"use strict";
/**
 * A request to create a new user in database
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateUserRequestSchema = void 0;
exports.userCreateUserRequestSchema = {
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
