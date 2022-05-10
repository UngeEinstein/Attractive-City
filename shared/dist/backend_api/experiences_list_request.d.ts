/**
 * A request to get a list of experiences associated with a user.
 *
 * Typescript type which input schema corresponds to.
 */
export interface ExperiencesListRequest {
    /**
     * The value used to identify the user.
     */
    userId: string;
    /**
     * A value describing what kind of relationship the experiences should have with the user. Favorite and saved is combined.
     */
    viewType: "ignored" | "saved";
}
export declare const experiencesListRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        userId: {
            description: string;
            type: string;
        };
        viewType: {
            description: string;
            enum: string[];
        };
    };
    required: string[];
    type: string;
};
