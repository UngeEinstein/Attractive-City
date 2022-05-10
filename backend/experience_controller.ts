import { databaseConnector } from "./database_connector";

/**
 * System to manage general functionality connected with experiences.
 */
class ExperienceController {
  /**
   * Retrieve ignored experiences for a user.
   *
   * @param userId The ID of the user whose experiences should be retrieved.
   */
  getIgnored = (userId: string) => {
    return databaseConnector.getIgnored(userId);
  };

  /**
   * Retrieve saved experiences for a user.
   *
   * @param userId The ID of the user whose experiences should be retrieved.
   */
  getSaved = (userId: string) => {
    return databaseConnector.getSaved(userId);
  };

  getExperience = (experienceId: number) => {
    return databaseConnector.getExperience(experienceId);
  };

  /**
   * Register a view of supplied experience by supplied user.
   *
   * @param experienceId The ID of the experience to register a view to.
   * @param overwrite What behaviour should the method use if the view is already present.
   * @param userId The ID of the user whose view should be registered.
   * @param viewType What relationship does the experience have to the user.
   */
  registerView = async (
    experienceId: number,
    overwrite: "conservative" | "none" | "overwrite",
    userId: string,
    viewType: "favorite" | "ignored" | "saved" | "seen"
  ) => {
    const previousView = await databaseConnector.getView(experienceId, userId);
    if (previousView) {
      // View with experience and user already existed.
      let shouldUpdate = true;
      switch (overwrite) {
        case "conservative":
          // Update as long as none of the cases are true.
          shouldUpdate = !(
            viewType === "seen" ||
            (viewType === "saved" && previousView.viewType === "favorite")
          );
          break;
        case "none":
          // Should never update if already present.
          shouldUpdate = false;
          break;
        case "overwrite":
          // Should always update if already present.
          break;
      }
      if (shouldUpdate) {
        await databaseConnector.updateView(experienceId, userId, viewType);
      }
    } else {
      // View with experience and user did not exist.
      await databaseConnector.insertView(experienceId, userId, viewType);
    }
  };

  resetTestDB = async () => {
    await databaseConnector.resetTestDB();
  };
}

/**
 * Singleton experience system.
 */
export const experienceSystem = new ExperienceController();
