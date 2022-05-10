import { Tag } from "./tag";
/**
 * A collection of information about an experience that can be visited.
 */
export interface Experience {
    /**
     * The main address the experience is associated with.
     */
    address: string;
    /**
     * Short textual description of the experience.
     */
    description: string;
    /**
     * A longer text describing and giving information about the experience.
     */
    detailedDescription: string;
    /**
     * The integer ID of the experience.
     */
    experienceId: number;
    /**
     * The URL of the background image of the carousel view.
     */
    featuredPicture: string;
    /**
     * The latitude part of position of the experience.
     */
    latitude: string;
    /**
     * The longitude part of position of the experience.
     */
    longitude: string;
    /**
     * The minimum integer number of people that can attend the experience as one group.
     */
    minGroupSize: number;
    /**
     * The maximum integer number of people that can attent the experience as one group.
     */
    maxGroupSize: number;
    /**
     * The integer number of years a particpant must at least be to join this experience.
     */
    minAge: number;
    /**
     * The integer maximum age of a participant attending the experience.
     */
    maxAge: number;
    /**
     * The name of the experience.
     */
    name: string;
    /**
     * A phone number that can be used to contact the provider of the experience.
     */
    phone: string;
    /**
     * A list of tags connected to the experience.
     */
    tags: Tag[];
    /**
     * URL to a website with more information about the experience. Empty if none.
     */
    website: string;
}
export declare const experienceSchema: {
    readonly $id: "Experience";
    readonly description: "A collection of information about an experience that can be visited.";
    readonly properties: {
        readonly experienceId: {
            readonly description: "The integer ID of the experience.";
            readonly type: "integer";
        };
        readonly address: {
            readonly description: "The main address the experience is associated with.";
            readonly type: "string";
        };
        readonly description: {
            readonly description: "Short textual description of the experience.";
            readonly type: "string";
        };
        readonly detailedDescription: {
            readonly description: "A longer text describing and giving information about the experience.";
            readonly type: "string";
        };
        readonly featuredPicture: {
            readonly description: "The URL of the background image of the carousel view.";
            readonly type: "string";
        };
        readonly latitude: {
            readonly description: "The latitude part of position of the experience.";
            readonly type: "string";
        };
        readonly longitude: {
            readonly description: "The longitude part of position of the experience.";
            readonly type: "string";
        };
        readonly maxAge: {
            readonly description: "The maximum integer number of people that can attent the experience as one group.";
            readonly type: "integer";
        };
        readonly maxGroupSize: {
            readonly description: "The maximum integer number of people that can attent the experience as one group.";
            readonly type: "integer";
        };
        readonly minAge: {
            readonly description: "The integer number of years a particpant must at least be to join this experience.";
            readonly type: "integer";
        };
        readonly minGroupSize: {
            readonly description: "The minimum integer number of people that can attend the experience as one group.";
            readonly type: "integer";
        };
        readonly name: {
            readonly description: "The name of the experience.";
            readonly type: "string";
        };
        readonly phone: {
            readonly description: "A phone number that can be used to contact the provider of the experience.";
            readonly type: "string";
        };
        readonly tags: {
            readonly description: "A list of tags connected to the experience.";
            readonly items: {
                readonly $ref: "Tag";
            };
            readonly title: "Tags";
            readonly type: "array";
        };
        readonly website: {
            readonly description: "URL to a website with more information about the experience. Empty if none.";
            readonly type: "string";
        };
    };
    readonly required: readonly ["experienceId", "address", "description", "detailedDescription", "featuredPicture", "latitude", "longitude", "maxAge", "maxGroupSize", "minAge", "minGroupSize", "name", "phone", "tags", "website"];
    readonly type: "object";
};
