import { Experience } from "../experience";
export declare type FilteredGroupCarouselListResponse = Experience[];
export declare const filteredGroupCarouselListResponseSchema: {
    $id: string;
    description: string;
    items: {
        $ref: string;
    };
    type: string;
};
