"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupResultsRequestSchema = void 0;
/**
 * JSON schema describing GroupResultsRequest.
 */
exports.groupResultsRequestSchema = {
    $id: "GroupResultsRequest",
    additionalProperties: false,
    description: "A request to get group results.",
    properties: {
        groupId: {
            description: "An UUID for the group to get results for.",
            type: "string",
        },
        resultSize: {
            description: "The amount of experiences to return as the result.",
            type: ["string"]
        },
    },
    required: ["groupId"],
    type: "object",
};
