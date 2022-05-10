"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experiencesListResponseSchema = void 0;
exports.experiencesListResponseSchema = {
    $id: "ExperiencesListResponse",
    items: {
        $ref: "ViewedExperience",
    },
    type: "array",
};
