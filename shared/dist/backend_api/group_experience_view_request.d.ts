/**
 * A request to get the views of an experience in a group context.
 */
export interface GroupExperienceViewRequest {
    /**
     * An UUID for the group the context is in.
     */
    groupId: string;
    /**
     * The id of the experience we want to get views for.
     */
    experienceId: number;
}
/**
 * JSON schema describing GroupExperienceViewRequest.
 */
export declare const groupExperienceViewRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        groupId: {
            description: string;
            type: string;
        };
        experienceId: {
            description: string;
            type: string;
        };
    };
    required: string[];
    type: string;
};
