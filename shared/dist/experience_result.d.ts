import { Experience } from "./experience";
/**
 * Results of an experience in the context of a group.
 */
export interface ExperienceResult {
    /**
     * The group id of the group the results belong to.
     */
    groupId: string;
    /**
     * The experience for which the results belong to.
     */
    experience: Experience;
    /**
     * The amount of likes the experience has recieved in the context of the group.
     */
    likes: number;
    /**
     * The amount of dislikes the experience has recieved in the context of the group.
     */
    dislikes: number;
}
export declare const experienceResultSchema: {
    readonly $id: "ExperienceResult";
    readonly additionalProperties: false;
    readonly description: "Information about an experience and the amount of likes and dislikes inside a group context";
    readonly properties: {
        readonly groupId: {
            readonly description: "UUID of group whose context the view was done in.";
            readonly type: "string";
        };
        readonly experience: {
            readonly description: "The experience the results belong to.";
            readonly $ref: "Experience";
        };
        readonly likes: {
            readonly description: "The number of likes this experience has recieved";
            readonly type: "integer";
        };
        readonly dislikes: {
            readonly description: "The number of dislikes this experience has recieved";
            readonly type: "integer";
        };
    };
    readonly required: readonly ["groupId", "experience", "likes", "dislikes"];
    readonly type: "object";
};
