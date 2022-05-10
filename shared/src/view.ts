import { ViewType } from "./view_type";

/**
 * Type for objects describing the relationship an experience has to a user.
 */
export interface View {
  /**
   * The integer ID of the experience.
   */
  experienceId: number;

  /**
   * The ID of the user.
   */
  userId: string;

  /**
   * The type of view.
   */
  viewType: ViewType;
}

export const viewSchema = {
  $id: "View",
  properties: {
    experienceId: {
      description: "The integer ID of the experience.",
      type: "integer",
    },
    userId: {
      description: "The ID of the user.",
      type: "string",
    },
    viewType: {
      description: "The type of view.",
      $ref: "ViewType",
    },
  },
  required: ["experienceId", "userId", "viewType"],
  type: "object",
};
