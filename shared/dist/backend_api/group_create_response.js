"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupCreateResponseSchema = void 0;
/**
 * JSON schema describing GroupCreateResponse.
 */
exports.groupCreateResponseSchema = {
    $id: "GroupCreateResponse",
    additionalProperties: false,
    description: "A response to a request to create a group.",
    properties: {
        groupId: {
            description: "UUID of the group created.",
            type: "string",
        },
    },
    required: ["groupId"],
    type: "object",
};
