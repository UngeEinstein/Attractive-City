"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredGroupCarouselListResponseSchema = void 0;
exports.filteredGroupCarouselListResponseSchema = {
    $id: "FilteredGroupCarouselListResponse",
    description: "A list of experiences to be displayed next in the carousel in a group context.",
    items: { $ref: "Experience" },
    type: "array",
};
