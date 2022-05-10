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
export const userInfoRequestSchema = {
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
