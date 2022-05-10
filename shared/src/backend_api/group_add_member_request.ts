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
export const groupAddMemberRequestSchema = {
  $id: "GroupAddMemberRequest",
  additionalProperties: false,
  description: "A requst to add a new member to the given group",
  properties: {
    groupId: {
      description: "UUID of the group to add the member to.",
      type: "string",
    },
    userId: {
      description: "The value used to identify the user to add to the group",
      type: "string",
    },
  },
  required: ["groupId", "userId"],
  type: "object",
};
