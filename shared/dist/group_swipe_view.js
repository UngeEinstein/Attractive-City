"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupSwipeViewSchema = void 0;
exports.groupSwipeViewSchema = {
    $id: "GroupSwipeView",
    additionalProperties: false,
    description: "",
    properties: {
        experienceId: { description: "ID of the experience.", type: "integer" },
        groupId: {
            description: "UUID of group whose context the view was done in.",
            type: "string",
        },
        userId: {
            description: "ID of the user who viewed the experience.",
            type: "string",
        },
        isLiked: {
            description: "Indicates whether the user liked or disliked the experience.",
            type: "boolean",
        },
    },
    required: ["experienceId", "groupId", "userId", "isLiked"],
    type: "object",
};
