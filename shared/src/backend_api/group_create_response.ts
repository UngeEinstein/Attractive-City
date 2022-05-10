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
export const groupCreateResponseSchema = {
  $id: "GroupCreateResponse",
  additionalProperties: false,
  description: "A response to a request to create a group.",
  properties: {
    groupId: {
      description: "UUID of the group created.",
      type: "string",
    },
  },
  required: ["groupId"],
  type: "object",
};
