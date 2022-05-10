import { Experience } from "./experience";
import { View } from "./view";
/**
 * An experience that has attached information about a view by a particular user.
 */
export declare type ViewedExperience = Experience & View;
export declare const viewedExperienceSchema: {
    readonly $id: "ViewedExperience";
    readonly description: "A collection of information about an experience that can be visited.";
    readonly allOf: readonly [{
        readonly $ref: "Experience";
    }, {
        readonly $ref: "View";
    }];
    readonly type: "object";
};
