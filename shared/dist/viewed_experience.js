"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewedExperienceSchema = void 0;
exports.viewedExperienceSchema = {
    $id: "ViewedExperience",
    description: "A collection of information about an experience that can be visited.",
    allOf: [
        {
            $ref: "Experience",
        },
        {
            $ref: "View",
        },
    ],
    type: "object",
};
