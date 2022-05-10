import { ViewedExperience } from "..";
export declare type ExperiencesListResponse = ViewedExperience[];
export declare const experiencesListResponseSchema: {
    $id: string;
    items: {
        $ref: string;
    };
    type: string;
};
