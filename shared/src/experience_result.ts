import { Experience } from "./experience";

/**
 * Results of an experience in the context of a group.
 */
 export interface ExperienceResult {
    /**
     * The group id of the group the results belong to.
     */
    groupId: string;

    /**
     * The experience for which the results belong to.
     */
    experience: Experience;
  
    /**
     * The amount of likes the experience has recieved in the context of the group.
     */
    likes: number;

    /**
     * The amount of dislikes the experience has recieved in the context of the group.
     */
     dislikes: number;
  }
  
  export const experienceResultSchema = {
    $id: "ExperienceResult",
    additionalProperties: false,
    description: "Information about an experience and the amount of likes and dislikes inside a group context",
    properties: {
      groupId: {
        description: "UUID of group whose context the view was done in.",
        type: "string",
      },
      experience: {
        description: "The experience the results belong to.",
        $ref: "Experience",
      },
      likes: {
        description: "The number of likes this experience has recieved",
        type: "integer",
      },
      dislikes: {
        description: "The number of dislikes this experience has recieved",
        type: "integer",
      },
    },
    required: ["groupId", "experience", "likes", "dislikes"],
    type: "object",
  } as const;
  