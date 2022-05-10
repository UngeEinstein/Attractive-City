/**
 * A request to register a view.
 */
export interface ExperiencesRegisterViewRequest {
    /**
     * The integer value used to identify the experience.
     */
    experienceId: number;
    /**
     * Indicates whether a old value should be overwritten if present. Conservative means that the value is only overwritten if the incoming value is more explicit than the old value; for example, favorite would overwrite seen, but not the other way around.
     */
    overwrite: "conservative" | "none" | "overwrite";
    /**
     * The value used to identify the user.
     */
    userId: string;
    /**
     * A value describing what kind of relationship the experience has with the user.
     */
    viewType: "favorite" | "ignored" | "saved" | "seen";
}
export declare const experiencesRegisterViewRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        experienceId: {
            description: string;
            type: string;
        };
        overwrite: {
            description: string;
            enum: string[];
        };
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
