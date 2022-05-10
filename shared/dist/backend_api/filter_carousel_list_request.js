"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredCarouselListRequestSchema = void 0;
exports.filteredCarouselListRequestSchema = {
    $id: "FilteredCarouselListRequest",
    additionalProperties: false,
    description: "A request to get a filtered list of experiences.",
    properties: {
        age: {
            description: "The integer age which the experiences should fit.",
            type: "integer",
        },
        groupSize: {
            description: "The integer size of the group which the experiences should fit.",
            type: "integer",
        },
        tagNames: {
            description: "The names of the tags that the experiences must fit.",
            type: "array",
            items: {
                $ref: "TagName",
            },
        },
        userId: {
            description: "The value used to identify the user.",
            type: "string",
        },
    },
    required: ["userId"],
    type: "object",
};
