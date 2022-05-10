import { ExperienceResult } from "../experience_result";
/**
 * A response to a request to get group results.
 */
export interface GroupResultResponse {
    /**
     * List of experience results
     */
    groupResults: ExperienceResult[];
}
export declare const groupResultResponseSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        groupResults: {
            type: string;
            items: {
                $ref: string;
            };
        };
    };
    type: string;
};
