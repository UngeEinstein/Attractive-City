import { ExperienceResult, Experience, Group, GroupSwipeView, TagName, experienceResultSchema } from "shared";
import { v4 as uuidv4 } from "uuid";
import { databaseConnector } from "./database_connector";
import {
  filterOnTags,
  filterOnAge,
  filterOnGroupSize,
} from "./utils/controllers";

/**
 * The number of experience presented as the main results of a group swiping.
 */
const RESULT_SIZE = "5";

/**
 * Controller to manage groups and group carousel experience.
 */
class GroupCarouselController {
  groupAddMember = async (groupId: string, userId: string): Promise<void> => {
    await databaseConnector.groupAddMember(groupId, userId);
  };

  /**
   * Create group with supplied name.
   *
   * @param name Name of group to create. An empty string is regarded as no name.
   * @returns The ID of the group created.
   */
  groupCreate = async (
    creatorUserId: string,
    name: string
  ): Promise<string> => {
    // Remove leading and trailing whitespace. Any string that is not just whitespace is a valid group name.
    name = name.trim();

    const groupId = uuidv4();

    await databaseConnector.groupCreate(groupId, name);

    await databaseConnector.groupAddMember(groupId, creatorUserId);

    return groupId;
  };

  groupGetGroups = async (userId: string): Promise<string[]> => {
    return await databaseConnector.getGroups(userId);
  };

  /**
   * Get a small list with detailed information about the best scoring experiences in the supplied group.
   *
   * @param groupId UUID of group.
   * @param resultSize The amount of experiences to be returned.
   */
  groupGetResults = async (groupId: string, resultSize: string = RESULT_SIZE): Promise<ExperienceResult[]> => {
    const groupSwipeViews = await databaseConnector.groupGetViews(groupId);
    const experienceRatingMap = new Map<number, number>();
    const experienceLikedMap = new Map<number, number>();
    const experienceDislikedMap = new Map<number, number>();
    for (const view of groupSwipeViews) {
      experienceRatingMap.set(
        view.experienceId,
        (experienceRatingMap.get(view.experienceId) ?? 0) +
          (view.isLiked ? 1 : -1)
      );
      experienceLikedMap.set(
        view.experienceId,
        (experienceLikedMap.get(view.experienceId) ?? 0) +
          (view.isLiked ? 1 : 0)
      );
      experienceDislikedMap.set(
        view.experienceId,
        (experienceDislikedMap.get(view.experienceId) ?? 0) +
          (view.isLiked ? 0 : 1)
      );
    }
    const experienceRatingMapSorted = new Map([...experienceRatingMap.entries()].sort((a, b) => b[1] - a[1]));
    const topResults = Array.from(experienceRatingMapSorted.keys()).slice(0, Number(resultSize));
    const resultArray = [];
    for (const experienceId of topResults){
      const experience = await databaseConnector.getExperience(experienceId);
      const likes = Number(experienceLikedMap.get(experienceId));
      const dislikes = Number(experienceDislikedMap.get(experienceId));
      const experienceResult : ExperienceResult =  {"groupId": groupId, "experience": experience, "likes": likes, "dislikes": dislikes};
      resultArray.push(experienceResult);
    }
    return resultArray;
  };

  /**
   * Get all views for a specific experience in a group context.
   * @param groupId UUID of group.
   * @param experienceId The id the of the experience.
   */
  groupGetExperienceViews = async (
    groupId: string,
    experienceId: number
  ): Promise<GroupSwipeView[]> => {
    return await databaseConnector.groupGetExperienceViews(
      groupId,
      experienceId
    );
  };

  /**
   * Get information about the group with supplied group ID.
   *
   * @param groupId UUID for group to get information about.
   */
  groupInfo = async (groupId: string): Promise<Group> => {
    return await databaseConnector.getGroup(groupId);
  };

  /**
   * Get the next experiences for a user in a group swiping context
   * @param groupId The group that the context is in.
   * @param userId The user that we want experiences for.
   * @returns An array of experiences that the user has yet to see.
   */
  groupGetNext = async (
    userId: string,
    groupId: string
  ): Promise<Experience[]> => {
    const experiences = await databaseConnector.getExperiences();
    const viewedExperiences = await databaseConnector.groupGetViewedExperiences(
      userId,
      groupId
    );
    if (viewedExperiences) {
      return experiences.filter(
        (exp) => !viewedExperiences.includes(exp.experienceId)
      );
    }
    return [];
  };

  /**
   * Get views from a group swiping for a specific user.
   *
   * @param userId The userId of the user to get views for
   * @param groupId UUID of the group.
   * @returns The list of views.
   */
  groupGetUserViews = async (
    userId: string,
    groupId: string
  ): Promise<GroupSwipeView[]> => {
    return await databaseConnector.groupGetUserViews(userId, groupId);
  };

  getFilteredExperiences = async (
    userId: string,
    groupId: string,
    tagNames?: TagName[],
    groupSize?: number,
    age?: number
  ) => {
    // Possible need for adjustment. Filtering with AND-approach.
    const allExperiences = await this.groupGetNext(userId, groupId);
    let results = allExperiences.filter((experience) => {
      return (
        filterOnGroupSize(experience, groupSize) &&
        filterOnTags(experience, tagNames) &&
        filterOnAge(experience, age)
      );
    });
    return results;
  };

  /**
   * Insert a view from a group context in the database.
   * @param experienceId The id of the experience that has been views
   * @param groupId The UUID of the group context
   * @param userId The id of the user who viewed the experience
   * @param isLiked Boolean for whether the user liked it or not
   */

  insertGroupView = async (
    experienceId: number,
    groupId: string,
    userId: string,
    isLiked: boolean
  ) => {
    const viewedExperiences = await databaseConnector.groupGetViewedExperiences(
      userId,
      groupId
    );
    const shouldUpdate = viewedExperiences.includes(experienceId);
    if (shouldUpdate) {
      await databaseConnector.updateGroupView(
        experienceId,
        groupId,
        userId,
        isLiked
      );
    } else
      await databaseConnector.insertGroupView(
        experienceId,
        groupId,
        userId,
        isLiked
      );
  };
}

/**
 * Singleton group carousel service.
 */
export const groupCarouselService: GroupCarouselController =
  new GroupCarouselController();
