/**
 * A object containing information representing a group.
 */
export interface Group {
    /**
     * An UUID for the group.
     */
    groupId: string;
    /**
     * A list of user IDs of members in the group.
     */
    memberIds: string[];
    /**
     * The group name.
     */
    name: string;
}
export declare const groupSchema: {
    readonly $id: "Group";
    readonly additionalProperties: false;
    readonly description: "A object containing information representing a group.";
    readonly properties: {
        readonly groupId: {
            readonly description: "An UUID for the group.";
            readonly type: "string";
        };
        readonly memberIds: {
            readonly description: "A list of user IDs of members in the group.";
            readonly items: {
                readonly description: "User ID of a member";
                readonly type: "string";
            };
            readonly type: "array";
        };
        readonly name: {
            readonly description: "The group name.";
            readonly type: "string";
        };
    };
    readonly required: readonly ["groupId", "memberIds", "name"];
    readonly type: "object";
};
