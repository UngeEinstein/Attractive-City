/**
 * Remove folder part of tag name, leaving the tag name.
 *
 * If the tag name does not include a folder part, return the tag name as is.
 */
export const extractTagName = (tagName: TagName) => {
  return tagName.substring(tagName.indexOf(":") + 1);
};

/**
 * Exhaustive list of valid string tag values.
 */
export type TagName =
  | "fit_for:adults"
  | "fit_for:children"
  | "fit_for:elderly"
  | "fit_for:families"
  | "fit_for:infants"
  | "location:center"
  | "location:suburban"
  | "location:rural"
  | "price:free"
  | "price:paid"
  | "culture"
  | "indoor"
  | "museum"
  | "music"
  | "nature"
  | "outdoor"
  | "restaurant"
  | "sports";

export const tagNameSchema = {
  $id: "TagName",
  enum: [
    "fit_for:adults",
    "fit_for:children",
    "fit_for:elderly",
    "fit_for:families",
    "fit_for:infants",
    "location:center",
    "location:suburban",
    "location:rural",
    "price:free",
    "price:paid",
    "culture",
    "indoor",
    "museum",
    "music",
    "nature",
    "outdoor",
    "restaurant",
    "sports",
  ],
};
