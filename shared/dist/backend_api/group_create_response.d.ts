/**
 * A response to a request to create a group.
 */
export interface GroupCreateResponse {
    /**
     * UUID of the group created.
     */
    groupId: string;
}
/**
 * JSON schema describing GroupCreateResponse.
 */
export declare const groupCreateResponseSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        groupId: {
            description: string;
            type: string;
        };
    };
    required: string[];
    type: string;
};
