import { TagName } from "..";

/**
 * A request to get a list of experiences associated with a user.
 *
 * Typescript type which input schema corresponds to.
 */
export interface FilteredCarouselListRequest {
  /**
   * The integer age which the experiences should fit.
   */
  age?: number;

  /**
   * The integer size of the group which the experiences should fit.
   */
  groupSize?: number;

  /**
   * The name of the tags which the experiences should fit.
   */
  tagNames?: TagName[];

  /**
   * The value used to identify the user.
   */
  userId: string;
}

export const filteredCarouselListRequestSchema = {
  $id: "FilteredCarouselListRequest",
  additionalProperties: false,
  description: "A request to get a filtered list of experiences.",
  properties: {
    age: {
      description: "The integer age which the experiences should fit.",
      type: "integer",
    },
    groupSize: {
      description:
        "The integer size of the group which the experiences should fit.",
      type: "integer",
    },
    tagNames: {
      description: "The names of the tags that the experiences must fit.",
      type: "array",
      items: {
        $ref: "TagName",
      },
    },
    userId: {
      description: "The value used to identify the user.",
      type: "string",
    },
  },
  required: ["userId"],
  type: "object",
};
