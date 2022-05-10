import { ViewedExperience } from "..";

export type ExperiencesListResponse = ViewedExperience[];

export const experiencesListResponseSchema = {
  $id: "ExperiencesListResponse",
  items: {
    $ref: "ViewedExperience",
  },
  type: "array",
};
