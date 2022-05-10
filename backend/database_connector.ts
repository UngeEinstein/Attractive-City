import mysql, { RowDataPacket } from "mysql2";
import { MYSQL_CONFIG, DATABASE_TEST } from "./utils/config";
import Ajv from "ajv";
import {
  Experience,
  Group,
  GroupSwipeView,
  TagName,
  tagNameSchema,
  View,
  ViewedExperience,
  ViewType,
} from "shared";

const ajv = new Ajv();
const tagNameValidator = ajv.compile(tagNameSchema);

/**
 * Object that is used to interface with the database solution.
 */
class DatabaseConnector {
  private pool = mysql.createPool(MYSQL_CONFIG).promise();

  /**
   * Attach tags to supplied list of experiences.
   *
   * If tags are already present, they will be overwritten.
   *
   * @param experiences Experiences to attach tags to.
   */
  private attachTags = async (experiences: Experience[]): Promise<void> => {
    const promise = this.pool.execute(
      "SELECT * FROM `experience_has_tag` NATURAL JOIN `tags`;"
    );

    const experienceMap: Map<number, Experience> = new Map();
    for (const experience of experiences) {
      // Remove old tags.
      experience.tags = [];

      experienceMap.set(experience.experienceId, experience);
    }

    const [rows, fields] = await promise;

    // Iterate all experience-tag relationships.
    const array = <RowDataPacket[]>rows;
    for (const row of array) {
      // Find experience.
      const experience = experienceMap.get(row.experienceId);
      if (!experience) {
        continue;
      }

      if (!tagNameValidator(row.name)) {
        throw new Error(
          `Unrecognized tag, ${row.name}, retrieved from database.`
        );
      }

      experience.tags.push({
        description: <string>row.description,
        name: <TagName>row.name,
      });
    }

    for (const experience of experiences) {
      experience.tags.sort((a, b) => {
        return (<string>a.name).localeCompare(<string>b.name);
      });
    }
  };

  /**
   * Get all experiences.
   */
  getExperiences = async (): Promise<Experience[]> => {
    const [rows, fields] = await this.pool.execute(
      "SELECT * FROM `experiences` NATURAL JOIN (SELECT `phone`, `providerId` FROM `providers`) AS `subproviders`;"
    );
    const array = <RowDataPacket[]>rows;
    for (const row of array) {
      row.tags = [];
    }
    const experiences = <Experience[]>array;
    await this.attachTags(experiences);
    return experiences;
  };

  getExperience = async (experienceId: number): Promise<Experience> => {
    const [rows, fields] = await this.pool.execute(
      "SELECT * FROM `experiences` NATURAL JOIN (SELECT `phone`, `providerId` FROM `providers`) AS `subproviders` WHERE experienceId = ?;",
      [experienceId]
    );
    const array = <RowDataPacket>rows;
    const experience = <Experience>array[0];
    if (experience) {
      await this.attachTags([experience]);
    }
    return experience;
  };

  /**
   * Retrieve ignored experiences for a user.
   *
   * @param userId The ID of the user whose experiences should be returned.
   */
  getIgnored = async (userId: string): Promise<ViewedExperience[]> => {
    const [rows, fields] = await this.pool.execute(
      "SELECT * FROM `views` NATURAL JOIN (SELECT * FROM `experiences` NATURAL JOIN (SELECT `phone`, `providerId` FROM `providers`) AS `subproviders`) as `extendexperiences` WHERE `viewType`='ignored' AND `userId`=?;",
      [userId]
    );
    const array = <RowDataPacket[]>rows;
    for (const row of array) {
      row.tags = [];
    }
    const experiences = <ViewedExperience[]>array;
    await this.attachTags(experiences);
    return experiences;
  };

  /**
   * Retrieve saved experiences for a user. This includes favorite experiences.
   *
   * @param userId The ID of the user whose experiences should be retrieved.
   */
  getSaved = async (userId: string): Promise<ViewedExperience[]> => {
    const [rows, fields] = await this.pool.execute(
      "SELECT * FROM `views` NATURAL JOIN (SELECT * FROM `experiences` NATURAL JOIN (SELECT `phone`, `providerId` FROM `providers`) AS `subproviders`) as `extendexperiences` WHERE `userId`=? AND (`viewType`='saved' OR `viewType`='favorite');",
      [userId]
    );
    const array = <RowDataPacket[]>rows;
    for (const row of array) {
      row.tags = [];
    }
    const experiences = <ViewedExperience[]>array;
    await this.attachTags(experiences);
    return experiences;
  };

  /**
   * Retrieve the view between the supplied experience and user.
   *
   * @param experienceId The ID of the experienced to get the view of.
   * @param userId The ID of the user whose view should be retrieved.
   */
  getView = async (
    experienceId: number,
    userId: string
  ): Promise<View | undefined> => {
    const [rows, _fields] = await this.pool.execute(
      "SELECT * FROM `views` WHERE `experienceId`=? AND `userId`=?;",
      [experienceId, userId]
    );
    const views = <mysql.RowDataPacket[]>rows;
    return views.length ? <View>views[0] : undefined;
  };

  /**
   * Add member to group.
   *
   * @param groupId UUID of group to add member to.
   * @param userId ID of user to add as member to group.
   */
  groupAddMember = async (groupId: string, userId: string): Promise<void> => {
    await this.pool.execute(
      "INSERT INTO `group_has_member` (groupId, userId) values (?, ?);",
      [groupId, userId]
    );
  };

  /**
   * Create a new group.
   *
   * @param groupId UUID of group to be create.
   * @param name Group name.
   */
  groupCreate = async (groupId: string, name: string): Promise<void> => {
    await this.pool.execute(
      "INSERT INTO `groups` (`groupId`, `name`) VALUES (?, ?);",
      [groupId, name]
    );
  };

  /**
   * Get views from a group swiping.
   *
   * @param groupId UUID of the group.
   * @returns The list of views.
   */
  groupGetViews = async (groupId: string): Promise<GroupSwipeView[]> => {
    const [rows, _fields] = await this.pool.execute(
      "SELECT * FROM `group_swipe_view` WHERE `groupId` = ?;",
      [groupId]
    );

    // At this point, the rows still contain 1, but typescript is difficult to work with, so...
    const array = <GroupSwipeView[]>rows;

    // Change 1 and 0 in isLiked to true and false.
    for (const view of array) {
      view.isLiked = view.isLiked ? true : false;
    }

    return array.map((view) => {
      return { ...view };
    });
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
    const [rows, _fields] = await this.pool.execute(
      "SELECT * FROM `group_swipe_view` WHERE `groupId` = ? AND `experienceId`= ?;",
      [groupId, experienceId]
    );

    // At this point, the rows still contain 1, but typescript is difficult to work with, so...
    const array = <GroupSwipeView[]>rows;

    // Change 1 and 0 in isLiked to true and false.
    for (const view of array) {
      view.isLiked = view.isLiked ? true : false;
    }

    return array.map((view) => {
      return { ...view };
    });
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
    const [rows, _fields] = await this.pool.execute(
      "SELECT * FROM `group_swipe_view` WHERE `userId`=? AND `groupId`=?;",
      [userId, groupId]
    );

    // At this point, the rows still contain 1, but typescript is difficult to work with, so...
    const array = <GroupSwipeView[]>rows;

    // Change 1 and 0 in isLiked to true and false.
    for (const view of array) {
      view.isLiked = view.isLiked ? true : false;
    }

    return array.map((view) => {
      return { ...view };
    });
  };

  /**
   * Get experienceIds of all experiences viewed by the user in group context
   * @param userId The id of the user the views are associated with
   * @param groupId The group context of the views
   */
  groupGetViewedExperiences = async (
    userId: string,
    groupId: string
  ): Promise<Number[]> => {
    const [rows, _fields] = await this.pool.execute(
      "SELECT `experienceId` FROM `group_swipe_view` WHERE `userId`=? AND `groupId`=?;",
      [userId, groupId]
    );
    const array = <RowDataPacket[]>rows;
    let experienceIds = [];
    for (const row of array) {
      experienceIds.push(<number>row.experienceId);
    }
    return experienceIds;
  };

  /**
   * Get group info.
   *
   * @param groupId UUID of group to get information on.
   */
  getGroup = async (groupId: string): Promise<Group> => {
    const [rows, _fields] = await this.pool.execute(
      "SELECT * FROM `group_has_member` NATURAL JOIN `groups` WHERE `groupId`=?;",
      [groupId]
    );
    const array = <RowDataPacket[]>rows;
    let members: string[] = [];
    let name: string = "";
    for (const row of array) {
      members.push(row.userId);
      name = row.name;
    }
    const group: Group = {
      groupId: groupId,
      memberIds: members,
      name: name,
    };
    return group;
  };

  getGroups = async (userId: string): Promise<string[]> => {
    const [rows, _fields] = await this.pool.execute(
      "SELECT * FROM `group_has_member` NATURAL JOIN `groups` WHERE `userId`=?;",
      [userId]
    );
    const array = <RowDataPacket[]>rows;
    let groups = [];
    for (const row of array) {
      groups.push(row.groupId);
    }
    // console.log(groups);
    return groups;
  };

  /**
   * Insert a new view for the supplied experience connected to the supplied user and group.
   *
   * @param experienceId The ID of the experienced to register a view of.
   * @param groupId The ID of the group that the user is associated to in this context
   * @param userId The ID of the user to associate the view with.
   * @param isLiked Boolean describing whether the experience is liked or not.
   */
  insertGroupView = async (
    experienceId: number,
    groupId: string,
    userId: string,
    isLiked: boolean
  ): Promise<void> => {
    await this.pool.execute(
      "INSERT INTO `group_swipe_view` (`experienceId`, `groupId`, `userId`, `isLiked`) VALUES (?, ?, ?, ?);",
      [experienceId, groupId, userId, isLiked]
    );
  };

  /**
   * Update a already present view of a experience connected to a user and a group.
   *
   * @param experienceId The ID of the experienced to register a view of.
   * @param groupId The ID of the group that the user is associated to in this context
   * @param userId The ID of the user the view is associated
   * @param isLiked Boolean describing whether the experience is liked or not.
   */
  updateGroupView = async (
    experienceId: number,
    groupId: string,
    userId: string,
    isLiked: boolean
  ): Promise<void> => {
    await this.pool.execute(
      "UPDATE `group_swipe_view` SET `isLiked`=? WHERE `experienceId`=? AND `groupId`=? AND `userId`=?;",
      [isLiked, experienceId, groupId, userId]
    );
  };

  /**
   * Insert a new view for the supplied experience connected to the supplied user.
   *
   * @param experienceId The ID of the experienced to register a view of.
   * @param userId The ID of the user to associate the view with.
   * @param viewType Type of view.
   */
  insertView = async (
    experienceId: number,
    userId: string,
    viewType: ViewType
  ): Promise<void> => {
    await this.pool.execute(
      "INSERT INTO `views` (`experienceId`, `userId`, `viewType`) VALUES (?, ?, ?);",
      [experienceId, userId, viewType]
    );
    // console.log("Inserting view: ", userId, experienceId, viewType);
  };

  /**
   * Update an already present view of a experience connected to a user.
   *
   * @param experienceId The ID of the experienced to register a view of.
   * @param userId The ID of the user the view is associated
   * @param viewType Type of view.
   */
  updateView = async (
    experienceId: number,
    userId: string,
    viewType: ViewType
  ): Promise<void> => {
    await this.pool.execute(
      "UPDATE `views` SET `viewType`=? WHERE `experienceId`=? AND `userId`=?;",
      [viewType, experienceId, userId]
    );
  };

  /**
   * Retrieve all views from the database
   */
  getViews = async (): Promise<RowDataPacket[]> => {
    const [rows, _fields] = await this.pool.execute("SELECT * FROM `views`;");
    const views = <mysql.RowDataPacket[]>rows;
    return views;
  };

  /**
   * Insert a new user in the database.
   * @param userId
   * @param email
   */
  createUser = async (userId: string, email: string | null): Promise<void> => {
    await this.pool.execute(
      "INSERT INTO `users` (`userID`, `email`) VALUES (?, ?);",
      [userId, email]
    );
  };

  /**
   * Get a user from database
   * @param userId
   */
  getUser = async (userId: string): Promise<RowDataPacket[]> => {
    const [rows, fields] = await this.pool.execute(
      "SELECT * FROM `users` WHERE `userID`=?;",
      [userId]
    );
    const user = <mysql.RowDataPacket[]>rows;
    return user;
  };

  /**
   *
   * Method for resetting test database.
   */
  resetTestDB = async (): Promise<void> => {
    /*
    * Resets the test database -> removes all entries from experiences, users and views
     and rebuilds with initial test data.
    */

    if (MYSQL_CONFIG.database !== DATABASE_TEST) {
      return;
    }
    await this.pool.execute("DELETE FROM users;");
    await this.pool.execute("DELETE FROM providers;");
    await this.pool.execute("DELETE FROM experiences;");
    await this.pool.execute("DELETE FROM views;");
    await this.pool.execute("DELETE FROM experience_has_tag;");
    await this.pool.execute("DELETE FROM groups");
    await this.pool.execute("DELETE FROM group_has_member");
    await this.pool.execute("DELETE FROM group_swipe_view");
    await this.pool.execute(
      'INSERT INTO `users` VALUES ("1", "test@test.no"), ("2", "test2@test.no");'
    );
    await this.pool.execute(
      'INSERT INTO `providers` VALUES (1, 98765432, "1");'
    );
    await this.pool.execute(
      "INSERT INTO `experiences` VALUES " +
        `(1, 1, "Gamle bybro, 7013 Trondheim", "Amazing old bridge in a lovely part of Trondheim", "Locals say that a kiss under the arches will mean good luck for the relationship.", "https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,f_jpg,h_400,q_65,w_587/http://zpoton.com/publicdata/productdb/products/1052/images/5914_n.jpg", 63.42821619525277, 10.401597114315813, 0, 100, 0, 100, "Old Town Bridge", ""), ` +
        `(2, 1, "Brattoerkaia 14, Trondheim 7010 Norway", "Rockheim is the national museum of popular music.", "Rockheim is the national museum of popular music. Since the museum\'s opening in 2010 there has been a steady stream of visitors eager to learn about norwegian music and its history. Music is a source of enjoyment. It creates a sense of belonging and offers new experiences. But it is also a vital source of knowledge of ourselves and our cultural history. Behind the scenes, Rockheim\'s staff is engaged in managing and researching Norway\'s pop and rock music, and in making it accessible to the public. The visit to Rockheim begins in the spectacular \'Top Box\'. From the main exhibit on the 6th floor you proceed down floor by floor. The music and stories are communicated by means of interactive exhibit technology and objects from the museum\'s collections. You are welcomed by Rockheim\'s guides, who will be your hosts and will answer your questions about the exhibits.", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/0f/0b/a0/rockheim.jpg?w=1000&h=-1&s=1", 63.43874897841191, 10.401652396558564, 0, 20, 3, 100, "Rockheim", "https://rockheim.no/"), ` +
        `(3, 1, "Otto Nielsens veg 4, 7010 Trondheim", "At the top of the fantastic Tyholt Tower you will find the EGON restaurant with the most spectacular views in the city. Come to us for a great meal in beautiful surroundings. Welcome!", "A beautiful dinner experience for the whole family.", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/bf/1a/94/signal-2018-12-16-185842.jpg?w=1200&h=-1&s=1", 63.42241160875186, 10.431963366127249, 2, 12, 0, 100, "Egon Tower", "https://www.egon.no/restauranter/trc3b8ndelag/tarnet.html"), ` +
        `(4, 1, "Nedre Ila 68, 7018 Trondheim", "A guided fishing experience on the piers of Trondheim. Fun for the whole family. Equipment is provided.", "", "https://www.adressa.no/nyheter/trondheim/article11497768.ece/82877p/BINARY/w980/G559O0J4.1", 63.43249169236253, 10.356408734714865, 0, 100, 0, 100, "Fishing at Ila", "");`
    );
    await this.pool.execute(
      "INSERT INTO `views` (`userId`, `experienceId`, `viewType`) VALUES" +
        `("1", 1, "saved"), ("1", 2, "favorite"), ("1", 3, "ignored");`
    );
    await this.pool.execute(
      "INSERT INTO `experience_has_tag` VALUES" + `(1,4), (2,2), (2,3), (3,4);`
    );
  };
}

/**
 * Singleton database connector.
 */
export const databaseConnector = new DatabaseConnector();
