/**
 * Different relationships a experience can have to a user. Types of views.
 */
export type ViewType = "favorite" | "saved" | "seen" | "ignored";

export const viewTypeSchema = {
  $id: "ViewType",
  enum: ["favorite", "saved", "seen", "ignored"],
};
