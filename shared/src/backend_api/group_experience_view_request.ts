/**
 * A request to get the views of an experience in a group context.
 */

export interface GroupExperienceViewRequest {
  /**
   * An UUID for the group the context is in.
   */
  groupId: string;

  /**
   * The id of the experience we want to get views for.
   */
  experienceId: number;
}

/**
 * JSON schema describing GroupExperienceViewRequest.
 */
export const groupExperienceViewRequestSchema = {
  $id: "GroupExperienceViewRequest",
  additionalProperties: false,
  description:
    "A request to get the views of an experience in a group context.",
  properties: {
    groupId: {
      description: "UUID of the group .",
      type: "string",
    },
    experienceId: {
      description: "The id of the experience we want the views from.",
      type: "integer",
    },
  },
  required: ["groupId", "experienceId"],
  type: "object",
};
