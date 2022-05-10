import Ajv from "ajv";
import { app, server } from "../index";
import {
  BackendApi,
  groupSchema,
  experienceResultSchema,
  experienceSchema,
  tagSchema,
  tagNameSchema,
  GroupSwipeView,
  groupSwipeViewSchema,
} from "shared";
import supertest from "supertest";
import { groupCarouselService } from "../group_carousel_controller";
import { validate } from "uuid";
import { experienceSystem } from "../experience_controller";

const api = supertest(app);
const ajv = new Ajv();

const createPath = "/api/groups/create";
const addMemberPath = "/api/groups/addMember";
const infoPath = "/api/groups/info";
const carouselNextPath = "/api/groups/carousel/next";
const insertViewPath = "/api/groups/carousel/insert_view";
const experienceViewPath = "/api/groups/experience/views";
const resultsPath = "/api/groups/results";

ajv.addSchema(groupSchema);
ajv.addSchema(experienceResultSchema);
ajv.addSchema(experienceSchema);
ajv.addSchema(groupSwipeViewSchema);
ajv.addSchema(tagNameSchema);
ajv.addSchema(tagSchema);

beforeEach(async () => {
  await experienceSystem.resetTestDB();
});
const createResponseValidator = ajv.compile(
  BackendApi.groupCreateResponseSchema
);
const groupInfoResponseValidator = ajv.compile(
  BackendApi.groupInfoResponseSchema
);
const groupCarouselListResponseValidator = ajv.compile(
  BackendApi.filteredGroupCarouselListResponseSchema
);
const groupExperienceViewResponseValidator = ajv.compile(
  BackendApi.groupExperienceViewResponseSchema
);

const groupResultResponseValidator = ajv.compile(
  BackendApi.groupResultResponseSchema
);

let GROUP_ID = "";
const addGroup = async (creatorUserId: string, groupName: string) => {
  const request: BackendApi.GroupCreateRequest = {
    creatorUserId: creatorUserId,
    groupName: groupName,
  };

  const response = await api
    .post(createPath)
    .set("Content-Type", "application/json")
    .send(request)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(createResponseValidator(response.body)).toBeTruthy();

  const validResponse = <BackendApi.GroupCreateResponse>response.body;

  expect(validate(validResponse.groupId)).toBeTruthy();
  GROUP_ID = validResponse.groupId;
};

describe("group route", () => {
  describe("group create endpoint", () => {
    it("should accept application/json content type", async () => {
      const request: BackendApi.GroupCreateRequest = {
        creatorUserId: "1",
        groupName: "New group",
      };

      await api
        .post(createPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);
    });

    it("should not accept content types not equal to application/json", async () => {
      await api
        .post(createPath)
        .set("Content-Type", "application/xml")
        .send("<p>Lorem ipsum</p>")
        .expect(400);
    });

    it("should not accept malformed request body", async () => {
      const requestBodies = [
        {
          additionalField: "What?",
          creatorUserId: "1",
          groupName: "Some group",
        },
        {
          creatorUserId: "1",
        },
        {
          groupName: "Some group",
        },
      ];

      let count = 0;
      for (const requestBody of requestBodies) {
        await api
          .post(createPath)
          .set("Content-Type", "application/json")
          .send(requestBody)
          .expect(400);
        count++;
      }

      expect(count).toBe(requestBodies.length);
    });

    it("should return response that validates against response schema", async () => {
      const request: BackendApi.GroupCreateRequest = {
        creatorUserId: "1",
        groupName: "New group",
      };

      const response = await api
        .post(createPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(createResponseValidator(response.body)).toBeTruthy();
    });

    test("that a group is created", async () => {
      const request: BackendApi.GroupCreateRequest = {
        creatorUserId: "1",
        groupName: "New group",
      };

      const response = await api
        .post(createPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(createResponseValidator(response.body)).toBeTruthy();

      const validResponse = <BackendApi.GroupCreateResponse>response.body;

      expect(validate(validResponse.groupId)).toBeTruthy();

      const group = await groupCarouselService.groupInfo(validResponse.groupId);
      expect(group.groupId).toBe(validResponse.groupId);
      expect(group.memberIds).toContain("1");
      expect(group.name).toBe("New group");
    });
  });

  describe("group info endpoint", () => {
    const creatorUserId = "1";
    const groupName = "New group";
    beforeEach(async () => {
      await addGroup(creatorUserId, groupName);
    });

    it("Should return the correct info for a given group", async () => {
      const params: BackendApi.GroupInfoRequest = {
        groupId: GROUP_ID,
      };
      const response = await api
        .get(infoPath)
        .query(params)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      expect(groupInfoResponseValidator(response.body)).toBeTruthy();

      const validResponse = <BackendApi.GroupInfoResponse>response.body;
      const group = validResponse.group;

      expect(group.groupId).toEqual(GROUP_ID);
      expect(group.memberIds).toEqual([creatorUserId]);
      expect(group.name).toEqual(groupName);
    });

    it("Should not accept malformatted request", async () => {
      await api
        .get(infoPath)
        .query({
          groupId: { number: 1 },
        })
        .expect(400);
    });
  });

  describe("add member endpoint", () => {
    beforeEach(async () => {
      await addGroup("1", "New group");
    });

    it("should add member to group", async () => {
      const userId = "2";
      const request: BackendApi.GroupAddMemberRequest = {
        groupId: GROUP_ID,
        userId: userId,
      };

      await api
        .post(addMemberPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);

      const group = await groupCarouselService.groupInfo(GROUP_ID);
      expect(group.memberIds.includes(userId)).toBeTruthy();
    });

    it("should not accept malformatted request", async () => {
      let request = {
        groupId: GROUP_ID,
        userId: 2,
      };

      await api
        .post(addMemberPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(400);

      await api.post(addMemberPath).send("malformatted text").expect(400);
    });

    it("Should not add a group member if user is not registered", async () => {
      const userId = "3";
      const request: BackendApi.GroupAddMemberRequest = {
        groupId: GROUP_ID,
        userId: userId,
      };

      await api
        .post(addMemberPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(500);
    });
  });

  describe("carousel get next endpoint (no filters)", () => {
    beforeEach(async () => {
      await addGroup("1", "Carousel group");
    });
    it("should not accept malformatted request", async () => {
      await api
        .get(carouselNextPath)
        .query({ userId: 1, groupId: { groupId: "1" } })
        .expect(400);
    });
    it("should not get experiences if the user is not registered in the group", async () => {
      await api
        .get(carouselNextPath)
        .query({ userId: "2", groupId: GROUP_ID })
        .expect(401);
    });
    it("should return response that validates against response schema", async () => {
      const views = [2, 4];
      views.forEach(async (view) => {
        await groupCarouselService.insertGroupView(view, GROUP_ID, "1", true);
      });
      const response = await api
        .get(carouselNextPath)
        .query({ userId: "1", groupId: GROUP_ID })
        .expect(200);
      expect(groupCarouselListResponseValidator(response.body)).toBeTruthy();
    });

    it("should return unseen experiences for a user in the group", async () => {
      const views = [2, 4];
      views.forEach(async (view) => {
        await groupCarouselService.insertGroupView(view, GROUP_ID, "1", true);
      });
      const response = await api
        .get(carouselNextPath)
        .query({ userId: "1", groupId: GROUP_ID })
        .expect(200);
      expect(groupCarouselListResponseValidator(response.body)).toBeTruthy();
      const validResponse = <BackendApi.FilteredGroupCarouselListResponse>(
        response.body
      );
      expect(
        validResponse.every((exp) => views.includes(exp.experienceId))
      ).toBeFalsy();
    });
  });

  describe("insert view endpoint", () => {
    beforeEach(async () => {
      await addGroup("1", "Carousel group");
    });
    it("should only accept application/json content type", async () => {
      const request = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);
      await api
        .post(insertViewPath)
        .set("Content-Type", "text/html")
        .send("<p> Malformatted request </p>")
        .expect(400);
    });
    it("should not accept malformated request", async () => {
      const request = {
        userId: "1",
        groupId: GROUP_ID,
        experienceId: "1",
        isLiked: false,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(400);
    });
    it("should insert view correctly", async () => {
      const request = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);
      const userViews: GroupSwipeView[] =
        await groupCarouselService.groupGetUserViews(
          request.userId,
          request.groupId
        );
      expect(
        userViews
          .map((view) => view.experienceId)
          .includes(request.experienceId)
      ).toBeTruthy();
      expect(
        userViews
          .filter((view) => view.isLiked === request.isLiked)
          .map((view) => view.experienceId)
          .includes(request.experienceId)
      ).toBeTruthy();
    });
    it("should update view correctly if a view exists", async () => {
      let request = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);

      request.isLiked = !request.isLiked;
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);
      const userViews: GroupSwipeView[] =
        await groupCarouselService.groupGetUserViews(
          request.userId,
          request.groupId
        );
      expect(
        userViews
          .map((view) => view.experienceId)
          .includes(request.experienceId)
      ).toBeTruthy();
      expect(
        userViews
          .filter((view) => view.isLiked === request.isLiked)
          .map((view) => view.experienceId)
          .includes(request.experienceId)
      ).toBeTruthy();
    });
    it("should not insert view from user not in group", async () => {
      const request = {
        userId: "213123",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(401);
    });
  });

  describe("get group results endpoint", () => {
    beforeEach(async () => {
      await addGroup("1", "New group");
    });

    it("should accept request with only groupId", async () => {
      await api
        .get(resultsPath)
        .query({ groupId: GROUP_ID })
        .expect(200);
    });

    it("should accept request with groupId and resultSize", async () => {
      await api
        .get(resultsPath)
        .query({ groupId: GROUP_ID, resultSize: "5" })
        .expect(200);
    });

    it("should not accept request without groupId", async () => {
      await api
        .get(resultsPath)
        .expect(400);
    });

    it("should not accept malformatted request", async () => {
      await api
        .get(resultsPath)
        .query({ groupId: { groupId: GROUP_ID } })
        .expect(400);
    });
    
    it("should return response that validates against response schema", async () => {
      const request = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);
      const response = await api
        .get(resultsPath)
        .query({ groupId: GROUP_ID })
        .expect(200);
      expect(groupResultResponseValidator(response.body)).toBeTruthy();
    });

    it("should return response of given resultSize", async () => {
      const dislikeRequest = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      const likeRequest = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 2,
        isLiked: true,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(dislikeRequest)
        .expect(200);
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(likeRequest)
        .expect(200);
      const response = await api
        .get(resultsPath)
        .query({ groupId: GROUP_ID, resultSize: "1" })
        .expect(200);
      expect(groupResultResponseValidator(response.body)).toBeTruthy();
      const validResponse = <BackendApi.GroupResultResponse>(response.body);
      expect(validResponse.groupResults.length).toBe(1);
    });

    it("should return response with experiences in the order of highest rating first", async () => {
      const dislikeRequest = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      const likeRequest = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 2,
        isLiked: true,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(dislikeRequest)
        .expect(200);
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(likeRequest)
        .expect(200);
      const response = await api
        .get(resultsPath)
        .query({ groupId: GROUP_ID, resultSize: "1" })
        .expect(200);
      expect(groupResultResponseValidator(response.body)).toBeTruthy();
      const validResponse = <BackendApi.GroupResultResponse>(response.body);
      expect(validResponse.groupResults[0].experience.experienceId).toBe(2);
    });

  });
  describe("Get experience views endpoint", () => {
    beforeEach(async () => {
      await addGroup("1", "Carousel group");
    });
    it("Should not accept malformatted request", async () => {
      const params = {
        groupId: { groupId: 1 },
        experienceId: 1,
      };
      await api.get(experienceViewPath).query(params).expect(400);
    });

    it("Should accept correctly formatted request and return a valid response", async () => {
      let request = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);
      const params: BackendApi.GroupExperienceViewRequest = {
        groupId: "1",
        experienceId: 1,
      };
      const response = await api
        .get(experienceViewPath)
        .query(params)
        .expect(200);
      expect(groupExperienceViewResponseValidator(response.body)).toBeTruthy();
    });

    it("Should correctly return the views of an experience", async () => {
      let request = <BackendApi.GroupSwipeRegisterViewRequest>{
        userId: "1",
        groupId: GROUP_ID,
        experienceId: 1,
        isLiked: false,
      };
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);

      const userId = "2";
      const addMemberRequest: BackendApi.GroupAddMemberRequest = {
        groupId: GROUP_ID,
        userId: userId,
      };

      await api
        .post(addMemberPath)
        .set("Content-Type", "application/json")
        .send(addMemberRequest)
        .expect(200);

      request.userId = "2";
      request.isLiked = true;
      await api
        .post(insertViewPath)
        .set("Content-Type", "application/json")
        .send(request)
        .expect(200);

      const params: BackendApi.GroupExperienceViewRequest = {
        groupId: GROUP_ID,
        experienceId: 1,
      };
      const response = await api
        .get(experienceViewPath)
        .query(params)
        .expect(200);
      const expectedViews = [
        {
          userId: "1",
          groupId: GROUP_ID,
          experienceId: 1,
          isLiked: false,
        },
        {
          userId: "2",
          groupId: GROUP_ID,
          experienceId: 1,
          isLiked: true,
        },
      ];
      expect(groupExperienceViewResponseValidator(response.body)).toBeTruthy();
      const views = <GroupSwipeView[]>response.body;
      expect(views).toEqual(expectedViews);
    });
  });
  afterAll(() => {
    server.close();
  });
});
