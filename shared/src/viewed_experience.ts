import { Experience } from "./experience";
import { View } from "./view";

/**
 * An experience that has attached information about a view by a particular user.
 */
export type ViewedExperience = Experience & View;

export const viewedExperienceSchema = {
  $id: "ViewedExperience",
  description:
    "A collection of information about an experience that can be visited.",
  allOf: [
    {
      $ref: "Experience",
    },
    {
      $ref: "View",
    },
  ],
  type: "object",
} as const;
