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
export declare const tagListContains: (tagName: TagName, tags: Tag[]) => boolean;
/**
 * JSON schema used to validate against the Tag type.
 */
export declare const tagSchema: {
    readonly $id: "Tag";
    readonly additionalProperties: false;
    readonly description: "A tag associated with experiences to group them into categories and communciate a common property.";
    readonly properties: {
        readonly description: {
            readonly description: "A description of what the tag says about experiences it is attached to.";
            readonly type: "string";
        };
        readonly name: {
            readonly description: "The name of the tag.";
            readonly $ref: "TagName";
        };
    };
    readonly required: readonly ["description", "name"];
    readonly type: "object";
};
/**
 * Object that contains all valid tags.
 */
export declare const tagValues: Record<TagName, Tag>;
