"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupResultResponseSchema = void 0;
exports.groupResultResponseSchema = {
    $id: "GroupResultResponse",
    additionalProperties: false,
    description: "A list of ExperienceResults to be displayed next in the group results.",
    "properties": {
        "groupResults": {
            type: "array",
            items: {
                $ref: "ExperienceResult",
            }
        }
    },
    type: "object",
};
