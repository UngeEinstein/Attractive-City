/**
 * A request to get group info.
 */
export interface GroupInfoRequest {
    /**
     * An UUID for the group to get info about.
     */
    groupId: string;
}
/**
 * JSON schema describing GroupInfoRequest.
 */
export declare const groupInfoRequestSchema: {
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
