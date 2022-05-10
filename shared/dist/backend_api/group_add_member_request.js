"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupAddMemberRequestSchema = void 0;
/**
 * JSON schema describing GroupAddMemberRequest.
 */
exports.groupAddMemberRequestSchema = {
    $id: "GroupAddMemberRequest",
    additionalProperties: false,
    description: "A requst to add a new member to the given group",
    properties: {
        groupId: {
            description: "UUID of the group to add the member to.",
            type: "string",
        },
        userId: {
            description: "The value used to identify the user to add to the group",
            type: "string",
        },
    },
    required: ["groupId", "userId"],
    type: "object",
};
