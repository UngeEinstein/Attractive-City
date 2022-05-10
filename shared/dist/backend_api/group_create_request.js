"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupCreateRequestSchema = void 0;
/**
 * JSON schema describing GroupCreateRequest.
 */
exports.groupCreateRequestSchema = {
    $id: "GroupCreateRequest",
    additionalProperties: false,
    description: "A request to create a new group with an associated creator.",
    properties: {
        creatorUserId: {
            description: "The value used to identify the group creator. The creator will be the initial owner of the group.",
            type: "string",
        },
        groupName: {
            description: "The name of the group to create. An empty string is regarded as no name.",
            type: "string",
        },
    },
    required: ["creatorUserId", "groupName"],
    type: "object",
};
