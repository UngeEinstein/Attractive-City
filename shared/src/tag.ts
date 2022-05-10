import { TagName } from "./tag_name";

/**
 * A tag associated with experiences to group them into categories and communciate a common property.
 */
export interface Tag {
  /**
   * A description of what the tag says about experiences it is attached to.
   */
  description: string;

  /**
   * The name of the tag.
   */
  name: TagName;
}

/**
 * Check if tag with supplied tag name is in tag list.
 *
 * @param tagName Tag name of tag to check for.
 * @param tags List of tags to search.
 * @returns True if the tag is contained in the list.
 */
export const tagListContains = (tagName: TagName, tags: Tag[]) => {
  let isTagPresent = false;
  for (const other of tags) {
    if (tagName === other.name) {
      isTagPresent = true;
    }
  }
  return isTagPresent;
};

/**
 * JSON schema used to validate against the Tag type.
 */
export const tagSchema = {
  $id: "Tag",
  additionalProperties: false,
  description:
    "A tag associated with experiences to group them into categories and communciate a common property.",
  properties: {
    description: {
      description:
        "A description of what the tag says about experiences it is attached to.",
      type: "string",
    },
    name: {
      description: "The name of the tag.",
      $ref: "TagName",
    },
  },
  required: ["description", "name"],
  type: "object",
} as const;

/**
 * Object that contains all valid tags.
 */
export const tagValues: Record<TagName, Tag> = Object.freeze({
  "fit_for:adults": {
    description:
      "The experience can accommodate, is designed for, or is fit for adults to enjoy.",
    name: "fit_for:adults",
  },
  "fit_for:children": {
    description:
      "The experience can accommodate, is designed for, or is fit for children to enjoy.",
    name: "fit_for:children",
  },
  "fit_for:elderly": {
    description:
      "The experience can accommodate, is designed for, or is fit for elderly to enjoy.",
    name: "fit_for:elderly",
  },
  "fit_for:families": {
    description:
      "The experience can accommodate, is designed for, or is fit for families to enjoy.",
    name: "fit_for:families",
  },
  "fit_for:infants": {
    description:
      "The experience can accommodate, is designed for, or is fit for infants to enjoy.",
    name: "fit_for:infants",
  },
  "location:center": {
    description: "The experience is located in the city center.",
    name: "location:center",
  },
  "location:suburban": {
    description: "The experience is located in the suburban part of city.",
    name: "location:suburban",
  },
  "location:rural": {
    description: "The experience is located in a rural area.",
    name: "location:rural",
  },
  "price:free": {
    description: "This experience is without cost or payment.",
    name: "price:free",
  },
  "price:paid": {
    description: "This experience costs some money.",
    name: "price:paid",
  },
  culture: {
    description: "An experience with this tag is a culture-experience.",
    name: "culture",
  },
  indoor: {
    description: "The experience is indoors, or inside a building.",
    name: "indoor",
  },
  museum: {
    description: "An experience with this tag is a museum-experience.",
    name: "museum",
  },
  music: {
    description: "An experience with this tag is music-related.",
    name: "music",
  },
  nature: {
    description: "The experience is located in or focuses on nature.",
    name: "nature",
  },
  outdoor: {
    description: "The experience is outdoors, or outside any building.",
    name: "outdoor",
  },
  restaurant: {
    description:
      "It is possible to buy food and something to drink at the experience.",
    name: "restaurant",
  },
  sports: {
    description: "The experience is related to sports.",
    name: "sports",
  },
} as const);
