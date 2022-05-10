import { Experience } from "..";

export type FilteredCarouselListResponse = Experience[];

export const filteredCarouselListResponseSchema = {
  $id: "FilteredCarouselListResponse",
  description:
    "A list of experiences to be displayed next in the speed dating carousel.",
  items: { $ref: "Experience" },
  type: "array",
};
