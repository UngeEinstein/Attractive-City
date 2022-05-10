"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceSchema = void 0;
exports.experienceSchema = {
    $id: "Experience",
    description: "A collection of information about an experience that can be visited.",
    properties: {
        experienceId: {
            description: "The integer ID of the experience.",
            type: "integer",
        },
        address: {
            description: "The main address the experience is associated with.",
            type: "string",
        },
        description: {
            description: "Short textual description of the experience.",
            type: "string",
        },
        detailedDescription: {
            description: "A longer text describing and giving information about the experience.",
            type: "string",
        },
        featuredPicture: {
            description: "The URL of the background image of the carousel view.",
            type: "string",
        },
        latitude: {
            description: "The latitude part of position of the experience.",
            type: "string",
        },
        longitude: {
            description: "The longitude part of position of the experience.",
            type: "string",
        },
        maxAge: {
            description: "The maximum integer number of people that can attent the experience as one group.",
            type: "integer",
        },
        maxGroupSize: {
            description: "The maximum integer number of people that can attent the experience as one group.",
            type: "integer",
        },
        minAge: {
            description: "The integer number of years a particpant must at least be to join this experience.",
            type: "integer",
        },
        minGroupSize: {
            description: "The minimum integer number of people that can attend the experience as one group.",
            type: "integer",
        },
        name: {
            description: "The name of the experience.",
            type: "string",
        },
        phone: {
            description: "A phone number that can be used to contact the provider of the experience.",
            type: "string",
        },
        tags: {
            description: "A list of tags connected to the experience.",
            items: { $ref: "Tag" },
            title: "Tags",
            type: "array",
        },
        website: {
            description: "URL to a website with more information about the experience. Empty if none.",
            type: "string",
        },
    },
    required: [
        "experienceId",
        "address",
        "description",
        "detailedDescription",
        "featuredPicture",
        "latitude",
        "longitude",
        "maxAge",
        "maxGroupSize",
        "minAge",
        "minGroupSize",
        "name",
        "phone",
        "tags",
        "website",
    ],
    type: "object",
};
