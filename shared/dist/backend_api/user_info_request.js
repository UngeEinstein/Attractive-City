"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfoRequestSchema = void 0;
/**
 * JSON schema describing GroupInfoRequest.
 */
exports.userInfoRequestSchema = {
    $id: "GroupInfoRequest",
    additionalProperties: false,
    description: "A request to get group info.",
    properties: {
        groupId: {
            description: "An UUID for the group to get info about.",
            type: "string",
        },
    },
    required: ["groupId"],
    type: "object",
};
