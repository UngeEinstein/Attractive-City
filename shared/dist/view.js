"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSchema = void 0;
exports.viewSchema = {
    $id: "View",
    properties: {
        experienceId: {
            description: "The integer ID of the experience.",
            type: "integer",
        },
        userId: {
            description: "The ID of the user.",
            type: "string",
        },
        viewType: {
            description: "The type of view.",
            $ref: "ViewType",
        },
    },
    required: ["experienceId", "userId", "viewType"],
    type: "object",
};
