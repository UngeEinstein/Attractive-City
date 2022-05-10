/**
 * Different relationships a experience can have to a user. Types of views.
 */
export declare type ViewType = "favorite" | "saved" | "seen" | "ignored";
export declare const viewTypeSchema: {
    $id: string;
    enum: string[];
};
