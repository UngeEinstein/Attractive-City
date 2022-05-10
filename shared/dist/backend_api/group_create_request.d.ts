/**
 * A request to create a new group with an associated creator.
 */
export interface GroupCreateRequest {
    /**
     * The value used to identify the group creator. The creator will be the initial owner of the group.
     */
    creatorUserId: string;
    /**
     * The name of the group to create. An empty string is regarded as no name.
     */
    groupName: string;
}
/**
 * JSON schema describing GroupCreateRequest.
 */
export declare const groupCreateRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        creatorUserId: {
            description: string;
            type: string;
        };
        groupName: {
            description: string;
            type: string;
        };
    };
    required: string[];
    type: string;
};
