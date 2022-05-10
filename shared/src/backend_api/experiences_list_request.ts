/**
 * A request to get a list of experiences associated with a user.
 *
 * Typescript type which input schema corresponds to.
 */
export interface ExperiencesListRequest {
  /**
   * The value used to identify the user.
   */
  userId: string;

  /**
   * A value describing what kind of relationship the experiences should have with the user. Favorite and saved is combined.
   */
  viewType: "ignored" | "saved";
}

export const experiencesListRequestSchema = {
  $id: "ExperiencesListRequest",
  additionalProperties: false,
  description: "A request to get a list of experiences associated with a user.",
  properties: {
    userId: {
      description: "The value used to identify the user.",
      type: "string",
    },
    viewType: {
      description:
        "A value describing what kind of relationship the experiences should have with the user. Favorite and saved is combined.",
      enum: ["ignored", "saved"],
    },
  },
  required: ["userId", "viewType"],
  type: "object",
};
