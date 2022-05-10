/**
 * A request to get group info.
 */
export interface UserInfoRequest {
    /**
     * An UUID for the group to get info about.
     */
    userId: string;
}
/**
 * JSON schema describing GroupInfoRequest.
 */
export declare const userInfoRequestSchema: {
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
