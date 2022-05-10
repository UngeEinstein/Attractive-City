import { Group } from "..";
/**
 * A response to a request to get group info.
 */
export interface GroupInfoResponse {
    /**
     * Group whose information was requested.
     */
    group: Group;
}
/**
 * JSON schema describing GroupInfoResponse.
 */
export declare const groupInfoResponseSchema: {
    $id: string;
    additionalProperties: boolean;
    description: string;
    properties: {
        group: {
            description: string;
            $ref: string;
        };
    };
    required: string[];
    type: string;
};
