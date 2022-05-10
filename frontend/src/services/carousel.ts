import { FilterConfig } from "./../views/TinderView";
import http from "../http-common";

const baseUrl = "/api/carousel";

/**
 * Get next experiences for the carousel view.
 *
 * @param userId ID of user who is using the carousel view.
 * @param filters Filters for experiences to show.
 * @returns The experiences retrieved.
 */
const getNext = async (userId: string, filters: FilterConfig) => {
  const res = await http.get(baseUrl + "/next", {
    params: {
      age: filters.age,
      groupSize: filters.groupSize,
      tagNames: filters.tags.map((tag) => {
        return tag.name;
      }),
      userId: userId,
    },
  });
  return res.data;
};

const carouselService = {
  getNext,
};

export default carouselService;
