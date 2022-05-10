import { GroupSwipeView } from "..";

export type GroupExperienceViewResponse = GroupSwipeView[];

export const groupExperienceViewResponseSchema = {
  $id: "GroupExperienceViewResponse",
  items: {
    $ref: "GroupSwipeView",
  },
  type: "array",
};
