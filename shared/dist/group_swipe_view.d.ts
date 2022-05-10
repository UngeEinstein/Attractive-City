/**
 * A view of a experience in the context of a group swipe.
 */
export interface GroupSwipeView {
    /**
     * ID of the experience.
     */
    experienceId: number;
    /**
     * UUID of group whose context the view was done in.
     */
    groupId: string;
    /**
     * ID of the user who viewed the experience.
     */
    userId: string;
    /**
     * Indicates whether the user liked or disliked the experience.
     */
    isLiked: boolean;
}
export declare const groupSwipeViewSchema: {
    readonly $id: "GroupSwipeView";
    readonly additionalProperties: false;
    readonly description: "";
    readonly properties: {
        readonly experienceId: {
            readonly description: "ID of the experience.";
            readonly type: "integer";
        };
        readonly groupId: {
            readonly description: "UUID of group whose context the view was done in.";
            readonly type: "string";
        };
        readonly userId: {
            readonly description: "ID of the user who viewed the experience.";
            readonly type: "string";
        };
        readonly isLiked: {
            readonly description: "Indicates whether the user liked or disliked the experience.";
            readonly type: "boolean";
        };
    };
    readonly required: readonly ["experienceId", "groupId", "userId", "isLiked"];
    readonly type: "object";
};
