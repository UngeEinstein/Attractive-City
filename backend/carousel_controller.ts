import { Experience, TagName } from "shared";
import { databaseConnector } from "./database_connector";
import { pythonConnector } from "./python_connector";
import {
  filterOnTags,
  filterOnAge,
  filterOnGroupSize,
} from "./utils/controllers";

/**
 * Controller to manage the speed dating of experiences – the experience carousel.
 */
class CarouselController {
  /**
   * Get the next experiences to display in the carousel.
   *
   * @returns A list of experiences.
   */
  getNext = async (userId: string): Promise<Experience[]> => {
    const experiences = await databaseConnector.getExperiences();
    try {
      const recommendation_ids = await pythonConnector.getRecommendations(
        userId
      );
      if (recommendation_ids.length !== 0) {
        let recommendations: Experience[] = [];
        for (let i = 0; i < recommendation_ids.length; i++) {
          const id = recommendation_ids[i];
          const exp = experiences.find((exp) => exp.experienceId == id);
          if (exp) {
            recommendations.push(exp);
          }
        }
        return recommendations;
      }
      return experiences;
    } catch (error) {
      console.log(error);
    }
    return experiences;
  };

  /**
   * Method for filtering experiences.
   *
   * @param tagNames: List of tag names of tags to filter on.
   * @param groupSize: Size of the group.
   * @param age: Age to filter based on.
   * @param userId: Id of the user to retrieve experiences for
   */
  getFilteredExperiences = async (
    userId: string,
    tagNames?: TagName[],
    groupSize?: number,
    age?: number
  ) => {
    // Possible need for adjustment. Filtering with AND-approach.
    const allExperiences = await this.getNext(userId);
    let results = allExperiences.filter((experience) => {
      return (
        filterOnGroupSize(experience, groupSize) &&
        filterOnTags(experience, tagNames) &&
        filterOnAge(experience, age)
      );
    });
    return results;
  };
}

/**
 * Singleton carousel controller.
 */
export const carouselController: CarouselController = new CarouselController();
