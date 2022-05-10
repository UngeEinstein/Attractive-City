import { databaseConnector } from "./database_connector";

/**
 * Controller to manage general functionality for a user.
 */

class UserController {
  /**
   * Create a user
   *
   * @param userId The ID of the user that should be created. (From firebase)
   */
  createUser = async (userId: string, email: string | null) => {
    const userExist = await databaseConnector.getUser(userId);
    if (userExist.length === 0) {
      return databaseConnector.createUser(userId, email);
    }
  };

  /**
   * Get a user
   *
   * @param userId
   */
  getUser = async (userId: string) => {
    return databaseConnector.getUser(userId);
  };
}

/**
 * Singleton user controller.
 */
export const userController = new UserController();
