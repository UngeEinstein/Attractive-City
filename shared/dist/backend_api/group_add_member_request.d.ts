/**
 * A request to add a group member to a group.
 */
export interface GroupAddMemberRequest {
    /**
     * UUID of the group to add the member to.
     */
    groupId: string;
    /**
     * The value used to identify the user to add to the group.
     */
    userId: string;
}
/**
 * JSON schema describing GroupAddMemberRequest.
 */
export declare const groupAddMemberRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        groupId: {
            description: string;
            type: string;
        };
        userId: {
            description: string;
            type: string;
        };
    };
    required: string[];
    type: string;
};
