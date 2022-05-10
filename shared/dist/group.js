"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupSchema = void 0;
exports.groupSchema = {
    $id: "Group",
    additionalProperties: false,
    description: "A object containing information representing a group.",
    properties: {
        groupId: {
            description: "An UUID for the group.",
            type: "string",
        },
        memberIds: {
            description: "A list of user IDs of members in the group.",
            items: {
                description: "User ID of a member",
                type: "string",
            },
            type: "array",
        },
        name: {
            description: "The group name.",
            type: "string",
        },
    },
    required: ["groupId", "memberIds", "name"],
    type: "object",
};
