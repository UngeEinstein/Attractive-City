"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupInfoResponseSchema = void 0;
/**
 * JSON schema describing GroupInfoResponse.
 */
exports.groupInfoResponseSchema = {
    $id: "GroupInfoResponse",
    additionalProperties: false,
    description: "A response to a request to get group info.",
    properties: {
        group: {
            description: "A response to a request to get group info.",
            $ref: "Group",
        },
    },
    required: ["group"],
    type: "object",
};
