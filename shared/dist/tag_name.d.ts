/**
 * Remove folder part of tag name, leaving the tag name.
 *
 * If the tag name does not include a folder part, return the tag name as is.
 */
export declare const extractTagName: (tagName: TagName) => string;
/**
 * Exhaustive list of valid string tag values.
 */
export declare type TagName = "fit_for:adults" | "fit_for:children" | "fit_for:elderly" | "fit_for:families" | "fit_for:infants" | "location:center" | "location:suburban" | "location:rural" | "price:free" | "price:paid" | "culture" | "indoor" | "museum" | "music" | "nature" | "outdoor" | "restaurant" | "sports";
export declare const tagNameSchema: {
    $id: string;
    enum: string[];
};
