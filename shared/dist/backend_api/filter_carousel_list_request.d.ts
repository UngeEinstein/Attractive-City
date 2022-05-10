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
export declare const filteredCarouselListRequestSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        age: {
            description: string;
            type: string;
        };
        groupSize: {
            description: string;
            type: string;
        };
        tagNames: {
            description: string;
            type: string;
            items: {
                $ref: string;
            };
        };
        userId: {
            description: string;
            type: string;
        };
    };
    required: string[];
    type: string;
};
