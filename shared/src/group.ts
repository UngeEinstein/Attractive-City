/**
 * A object containing information representing a group.
 */
export interface Group {
  /**
   * An UUID for the group.
   */
  groupId: string;

  /**
   * A list of user IDs of members in the group.
   */
  memberIds: string[];

  /**
   * The group name.
   */
  name: string;
}

export const groupSchema = {
  $id: "Group",
  additionalProperties: false,
  description: "A object containing information representing a group.",
  properties: {
    groupId: {
      description: "An UUID for the group.",
      type: "string",
    },
    memberIds: {
      description: "A list of user IDs of members in the group.",
      items: {
        description: "User ID of a member",
        type: "string",
      },
      type: "array",
    },
    name: {
      description: "The group name.",
      type: "string",
    },
  },
  required: ["groupId", "memberIds", "name"],
  type: "object",
} as const;
