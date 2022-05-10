import { Experience } from "../experience";

export type FilteredGroupCarouselListResponse = Experience[];

export const filteredGroupCarouselListResponseSchema = {
  $id: "FilteredGroupCarouselListResponse",
  description:
    "A list of experiences to be displayed next in the carousel in a group context.",
  items: { $ref: "Experience" },
  type: "array",
};
