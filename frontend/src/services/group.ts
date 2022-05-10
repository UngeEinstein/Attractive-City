import { BackendApi, Experience, ExperienceResult, Group, GroupSwipeView} from "shared";
import http from "../http-common";
import { FilterConfig } from "../views/TinderView";
const baseUrl = "api/groups";

const addGroupMember = async (
  addMemberRequest: BackendApi.GroupAddMemberRequest
): Promise<void> => {
  await http.post(baseUrl + "/addMember", addMemberRequest);
};

/**
 * Create a new group in the name of the supplied user with the supplied name.
 *
 * @param creatorUserId UID of the user which is creating the group.
 * @param groupName Name of group to be created.
 * @returns The group ID of the created group.
 */
const createGroup = async (
  creatorUserId: string,
  groupName: string
): Promise<string> => {
  const request = {
    creatorUserId: creatorUserId,
    groupName: groupName,
  };
  const data: BackendApi.GroupCreateResponse = (
    await http.post(baseUrl + "/create", request)
  ).data;
  return data.groupId;
};

const getGroup = async (groupId: string): Promise<Group> => {
  const res = await http.get(baseUrl + "/info", {
    params: {
      groupId: groupId,
    },
  });
  return res.data.group;
};

const getGroups = async (userId: string): Promise<string[]> => {
  const res = await http.get(baseUrl + "/groups", {
    params: {
      userId: userId,
    },
  });
  return res.data.group;
};

/**
 * Get group swiped experiences, including the number of likes and dislikes.
 *
 * @param groupId The UUID of the group context the user is in.
 * @returns The results.
 */

const getGroupResults = async (
  groupId: string
): Promise<ExperienceResult[]> => {
  const res = await http.get(`${baseUrl}/results`, {
    params: { groupId: groupId },
  });
  return res.data.groupResults;
};

/**
 * Get next experiences for the group carousel view.
 *
 * @param userId ID of user who is using the group carousel view.
 * @param groupId The id of the group context the user is in.
 * @param filters Filters for experiences to show.
 * @returns The experiences retrieved.
 */
const getCarouselNext = async (
  userId: string,
  groupId: string,
  filters?: FilterConfig
): Promise<Experience[]> => {
  const params: BackendApi.FilteredGroupCarouselListRequest = {
    userId: userId,
    groupId: groupId,
    age: filters?.age,
    groupSize: filters?.groupSize,
    tagNames: filters?.tags.map((tag) => {
      return tag.name;
    }),
  };
  const experiences: BackendApi.FilteredGroupCarouselListResponse = (
    await http.get(baseUrl + "/carousel/next", { params })
  ).data;
  return experiences;
};

const postGroupView = async (
  groupRegisterViewRequest: BackendApi.GroupSwipeRegisterViewRequest
) => {
  await http.post(baseUrl + "/carousel/insert_view", groupRegisterViewRequest);
};

/**
 * Get all views for a specific experience in a group context.
 * @param groupId UUID of group.
 * @param experienceId The id the of the experience.
 */
const getExperienceViews = async (
  groupId: string,
  experienceId: number
): Promise<GroupSwipeView[]> => {
  const params = {
    groupId: groupId,
    experienceId: experienceId,
  };
  const views: GroupSwipeView[] = await (
    await http.get(baseUrl + "/experience/views", { params })
  ).data;
  return views;
};

const groupService = {
  addGroupMember,
  createGroup,
  getGroup,
  getGroups,
  getGroupResults,
  getCarouselNext,
  getExperienceViews,
  postGroupView,
};

export default groupService;
