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

export const groupResultResponseSchema = {
  $id: "GroupResultResponse",
  additionalProperties: false,
  description: "A list of ExperienceResults to be displayed next in the group results.",
  "properties": {
    "groupResults": {
      type: "array",
      items: {
        $ref: "ExperienceResult",
      }
    }
  },
  type: "object",
};