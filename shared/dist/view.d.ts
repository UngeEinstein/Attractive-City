import { ViewType } from "./view_type";
/**
 * Type for objects describing the relationship an experience has to a user.
 */
export interface View {
    /**
     * The integer ID of the experience.
     */
    experienceId: number;
    /**
     * The ID of the user.
     */
    userId: string;
    /**
     * The type of view.
     */
    viewType: ViewType;
}
export declare const viewSchema: {
    $id: string;
    properties: {
        experienceId: {
            description: string;
            type: string;
        };
        userId: {
            description: string;
            type: string;
        };
        viewType: {
            description: string;
            $ref: string;
        };
    };
    required: string[];
    type: string;
};
