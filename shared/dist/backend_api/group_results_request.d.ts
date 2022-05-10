/**
 * A request to get group results.
 */
export interface GroupResultsRequest {
    /**
     * An UUID for the group to get results for.
     */
    groupId: string;
    /**
     * The amount of experiences to return as the result.
     */
    resultSize: string;
}
/**
 * JSON schema describing GroupResultsRequest.
 */
export declare const groupResultsRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        groupId: {
            description: string;
            type: string;
        };
        resultSize: {
            description: string;
            type: string[];
        };
    };
    required: string[];
    type: string;
};
