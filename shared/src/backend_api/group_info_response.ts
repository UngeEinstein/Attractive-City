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
export const groupInfoResponseSchema = {
  $id: "GroupInfoResponse",
  additionalProperties: false,
  description: "A response to a request to get group info.",
  properties: {
    group: {
      description: "A response to a request to get group info.",
      $ref: "Group",
    },
  },
  required: ["group"],
  type: "object",
};
