/**
 * A request to add a view for a user in a group context.
 */
export interface GroupSwipeRegisterViewRequest {
  /**
   * ID of the experience.
   */
  experienceId: number;

  /**
   * UUID of group whose context the view was done in.
   */
  groupId: string;

  /**
   * ID of the user who viewed the experience.
   */
  userId: string;

  /**
   * Indicates whether the user liked or disliked the experience.
   */
  isLiked: boolean;
}

export const groupSwipeRegisterViewRequestSchema = {
  $id: "GroupSwipeRegisterViewRequestSchema",
  additionalProperties: false,
  description: "",
  properties: {
    experienceId: { description: "ID of the experience.", type: "number" },
    groupId: {
      description: "UUID of group whose context the view was done in.",
      type: "string",
    },
    userId: {
      description: "ID of the user who viewed the experience.",
      type: "string",
    },
    isLiked: {
      description:
        "Indicates whether the user liked or disliked the experience.",
      type: "boolean",
    },
  },
  required: ["experienceId", "groupId", "userId", "isLiked"],
  type: "object",
};
