"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredCarouselListResponseSchema = void 0;
exports.filteredCarouselListResponseSchema = {
    $id: "FilteredCarouselListResponse",
    description: "A list of experiences to be displayed next in the speed dating carousel.",
    items: { $ref: "Experience" },
    type: "array",
};
