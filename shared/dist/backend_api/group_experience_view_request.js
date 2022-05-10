"use strict";
/**
 * A request to get the views of an experience in a group context.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupExperienceViewRequestSchema = void 0;
/**
 * JSON schema describing GroupExperienceViewRequest.
 */
exports.groupExperienceViewRequestSchema = {
    $id: "GroupExperienceViewRequest",
    additionalProperties: false,
    description: "A request to get the views of an experience in a group context.",
    properties: {
        groupId: {
            description: "UUID of the group .",
            type: "string",
        },
        experienceId: {
            description: "The id of the experience we want the views from.",
            type: "integer",
        },
    },
    required: ["groupId", "experienceId"],
    type: "object",
};
