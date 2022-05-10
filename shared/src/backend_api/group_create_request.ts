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
export const groupCreateRequestSchema = {
  $id: "GroupCreateRequest",
  additionalProperties: false,
  description: "A request to create a new group with an associated creator.",
  properties: {
    creatorUserId: {
      description:
        "The value used to identify the group creator. The creator will be the initial owner of the group.",
      type: "string",
    },
    groupName: {
      description:
        "The name of the group to create. An empty string is regarded as no name.",
      type: "string",
    },
  },
  required: ["creatorUserId", "groupName"],
  type: "object",
};
