/**
 * A request to add a view for a user in a group context.
 */
export interface GroupSwipeRegisterViewRequest {
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
export declare const groupSwipeRegisterViewRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        experienceId: {
            description: string;
            type: string;
        };
        groupId: {
            description: string;
            type: string;
        };
        userId: {
            description: string;
            type: string;
        };
        isLiked: {
            description: string;
            type: string;
        };
    };
    required: string[];
    type: string;
};
