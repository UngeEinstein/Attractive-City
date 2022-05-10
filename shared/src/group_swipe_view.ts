/**
 * A view of a experience in the context of a group swipe.
 */
export interface GroupSwipeView {
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

export const groupSwipeViewSchema = {
  $id: "GroupSwipeView",
  additionalProperties: false,
  description: "",
  properties: {
    experienceId: { description: "ID of the experience.", type: "integer" },
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
} as const;
