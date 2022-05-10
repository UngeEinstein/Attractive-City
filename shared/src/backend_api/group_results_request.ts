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
  export const groupResultsRequestSchema = {
    $id: "GroupResultsRequest",
    additionalProperties: false,
    description: "A request to get group results.",
    properties: {
      groupId: {
        description: "An UUID for the group to get results for.",
        type: "string",
      },
      resultSize: {
        description: "The amount of experiences to return as the result.",
        type: ["string"]
      },
    },
    required: ["groupId"],
    type: "object",
  };
  