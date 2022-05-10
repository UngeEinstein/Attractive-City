"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceResultSchema = void 0;
exports.experienceResultSchema = {
    $id: "ExperienceResult",
    additionalProperties: false,
    description: "Information about an experience and the amount of likes and dislikes inside a group context",
    properties: {
        groupId: {
            description: "UUID of group whose context the view was done in.",
            type: "string",
        },
        experience: {
            description: "The experience the results belong to.",
            $ref: "Experience",
        },
        likes: {
            description: "The number of likes this experience has recieved",
            type: "integer",
        },
        dislikes: {
            description: "The number of dislikes this experience has recieved",
            type: "integer",
        },
    },
    required: ["groupId", "experience", "likes", "dislikes"],
    type: "object",
};
