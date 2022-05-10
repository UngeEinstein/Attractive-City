/**
 * A request to register a view.
 */
export interface ExperiencesRegisterViewRequest {
  /**
   * The integer value used to identify the experience.
   */
  experienceId: number;

  /**
   * Indicates whether a old value should be overwritten if present. Conservative means that the value is only overwritten if the incoming value is more explicit than the old value; for example, favorite would overwrite seen, but not the other way around.
   */
  overwrite: "conservative" | "none" | "overwrite";

  /**
   * The value used to identify the user.
   */
  userId: string;

  /**
   * A value describing what kind of relationship the experience has with the user.
   */
  viewType: "favorite" | "ignored" | "saved" | "seen";
}

export const experiencesRegisterViewRequestSchema = {
  $id: "ExperiencesRegisterViewRequest",
  additionalProperties: false,
  description: "A request to register a view.",
  properties: {
    experienceId: {
      description: "The integer value used to identify the experience.",
      type: "integer",
    },
    overwrite: {
      description:
        "Indicates whether a old value should be overwritten if present. Conservative means that the value is only overwritten if the incoming value is more explicit than the old value; for example, favorite would overwrite seen, but not the other way around.",
      enum: ["conservative", "none", "overwrite"],
    },
    userId: {
      description: "The value used to identify the user.",
      type: "string",
    },
    viewType: {
      description:
        "A value describing what kind of relationship the experience has with the user.",
      enum: ["favorite", "saved", "seen", "ignored"],
    },
  },
  required: ["experienceId", "overwrite", "userId", "viewType"],
  type: "object",
};
