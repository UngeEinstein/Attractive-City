"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredGroupCarouselListRequestSchema = void 0;
exports.filteredGroupCarouselListRequestSchema = {
    $id: "FilteredGroupCarouselListRequest",
    additionalProperties: false,
    description: "A request to get a filtered list of experiences in a group context.",
    properties: {
        age: {
            description: "The integer age which the experiences should fit.",
            type: "integer",
        },
        groupId: {
            description: "The value used to identify the group",
            type: "string",
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
    required: ["userId", "groupId"],
    type: "object",
};
