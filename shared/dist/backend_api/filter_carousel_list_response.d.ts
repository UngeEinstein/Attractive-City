import { Experience } from "..";
export declare type FilteredCarouselListResponse = Experience[];
export declare const filteredCarouselListResponseSchema: {
    $id: string;
    description: string;
    items: {
        $ref: string;
    };
    type: string;
};
