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
export const groupInfoRequestSchema = {
  $id: "GroupInfoRequest",
  additionalProperties: false,
  description: "A request to get group info.",
  properties: {
    groupId: {
      description: "An UUID for the group to get info about.",
      type: "string",
    },
  },
  required: ["groupId"],
  type: "object",
};
