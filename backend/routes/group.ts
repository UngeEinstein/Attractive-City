import Ajv from "ajv";
import express from "express";
import { respondInvalidContent, respondWrongContentType } from "../endpoint";
import { groupCarouselService } from "../group_carousel_controller";
import { BackendApi } from "shared";
import { TagName, tagNameSchema } from "shared";

const router = express.Router();

const ajv = new Ajv();
ajv.addSchema(tagNameSchema);
const groupCreateRequestValidator = ajv.compile(
  BackendApi.groupCreateRequestSchema
);
const groupInfoRequestValidator = ajv.compile(
  BackendApi.groupInfoRequestSchema
);
const groupAddMemberRequestValidator = ajv.compile(
  BackendApi.groupAddMemberRequestSchema
);
const groupGetNextRequestValidatior = ajv.compile(
  BackendApi.filteredGroupCarouselListRequestSchema
);
const groupRegisterViewRequestValidator = ajv.compile(
  BackendApi.groupSwipeRegisterViewRequestSchema
);
const groupExperienceViewRequestValidator = ajv.compile(
  BackendApi.groupExperienceViewRequestSchema
);


const groupResultsRequestValidator = ajv.compile(
  BackendApi.groupResultsRequestSchema
);


router.post("/create", async (request, response) => {
  if (!request.is("application/json")) {
    respondWrongContentType(response);
    return;
  }

  if (!groupCreateRequestValidator(request.body)) {
    respondInvalidContent(response, groupCreateRequestValidator);
    return;
  }

  const createGroupRequest = <BackendApi.GroupCreateRequest>request.body;

  try {
    const groupId = await groupCarouselService.groupCreate(
      createGroupRequest.creatorUserId,
      createGroupRequest.groupName
    );
    const result: BackendApi.GroupCreateResponse = {
      groupId: groupId,
    };
    response.status(200).json(result);
  } catch (error) {
    response.status(500).send({
      error: error,
    });
  }
});

router.get("/info", async (request, response) => {
  const params: any = {
    groupId: request.query.groupId,
  };
  if (!groupInfoRequestValidator(params)) {
    respondInvalidContent(response, groupInfoRequestValidator);
    return;
  }
  const groupInfoRequest = <BackendApi.GroupInfoRequest>params;

  try {
    const group = await groupCarouselService.groupInfo(
      groupInfoRequest.groupId
    );
    response.status(200).json({ group: group });
  } catch (error) {
    response.status(500).json({
      error: error,
    });
  }
});

router.get("/experience/views", async (request, response) => {
  const params: any = {
    groupId: request.query.groupId,
    experienceId: Number(request.query.experienceId),
  };

  if (!groupExperienceViewRequestValidator(params)) {
    respondInvalidContent(response, groupExperienceViewRequestValidator);
    return;
  }

  const groupExperienceViewRequest = <BackendApi.GroupExperienceViewRequest>(
    params
  );

  try {
    const views = await groupCarouselService.groupGetExperienceViews(
      groupExperienceViewRequest.groupId,
      groupExperienceViewRequest.experienceId
    );
    response.status(200).json(views);
  } catch (error) {
    response.status(500).json({
      error: error,
    });
  }
});

router.get("/groups", async (request, response) => {
  const params: any = {
    userId: request.query.userId,
  };
  // if (!groupInfoRequestValidator(params)) {
  //   respondInvalidContent(response, groupInfoRequestValidator);
  //   return;
  // }

  //const groupInfoRequest = <GroupInfoRequest>params;

  try {
    const groups = await groupCarouselService.groupGetGroups(params.userId);
    response.status(200).json({ group: groups });
  } catch (error) {
    response.status(500).json({
      error: error,
    });
  }
});

router.post("/addMember", async (request, response) => {
  if (!request.is("application/json")) {
    respondWrongContentType(response);
    return;
  }

  if (!groupAddMemberRequestValidator(request.body)) {
    respondInvalidContent(response, groupAddMemberRequestValidator);
    return;
  }

  const groupAddMemberRequest = <BackendApi.GroupAddMemberRequest>request.body;
  try {
    await groupCarouselService.groupAddMember(
      groupAddMemberRequest.groupId,
      groupAddMemberRequest.userId
    );
    response.status(200).send();
  } catch (error) {
    response.status(500).json({ error });
  }
});

router.get("/carousel/next", async (request, response) => {
  let tagNames: TagName[] = [];
  if (request.query.tagNames !== undefined && request.query.tagNames !== "[]") {
    if (
      request.query.tagNames.length !== undefined &&
      typeof request.query.tagNames !== "string"
    ) {
      tagNames = <Array<TagName>>request.query.tagNames;
    } else {
      tagNames = [<TagName>request.query.tagNames];
    }
  }

  const params: any = {
    userId: request.query.userId,
    groupId: request.query.groupId,
    age:
      request.query.age !== undefined ? Number(request.query.age) : undefined,
    tagNames: tagNames,
    groupSize:
      request.query.groupSize !== undefined
        ? Number(request.query.groupSize)
        : 0,
  };

  if (!groupGetNextRequestValidatior(params)) {
    respondInvalidContent(response, groupGetNextRequestValidatior);
    return;
  }

  const groupGetNextRequest = <BackendApi.FilteredGroupCarouselListRequest>(
    params
  );

  try {
    const userGroups = await groupCarouselService.groupGetGroups(
      groupGetNextRequest.userId
    );
    if (!userGroups.includes(groupGetNextRequest.groupId)) {
      response.status(401).send("User not registered in group");
      return;
    }
    const experiences = await groupCarouselService.getFilteredExperiences(
      groupGetNextRequest.userId,
      groupGetNextRequest.groupId,
      groupGetNextRequest.tagNames,
      groupGetNextRequest.groupSize,
      groupGetNextRequest.age
    );
    response.status(200).send(experiences);
  } catch (error) {
    response.status(500).json({ error });
  }
});

router.post("/carousel/insert_view", async (request, response) => {
  if (!request.is("application/json")) {
    respondWrongContentType(response);
    return;
  }

  if (!groupRegisterViewRequestValidator(request.body)) {
    respondInvalidContent(response, groupRegisterViewRequestValidator);
    return;
  }

  const groupRegisterViewRequest = <BackendApi.GroupSwipeRegisterViewRequest>(
    request.body
  );

  try {
    const userGroups = await groupCarouselService.groupGetGroups(
      groupRegisterViewRequest.userId
    );
    if (!userGroups.includes(groupRegisterViewRequest.groupId)) {
      response.status(401).send("User not registered in group");
      return;
    }
    await groupCarouselService.insertGroupView(
      groupRegisterViewRequest.experienceId,
      groupRegisterViewRequest.groupId,
      groupRegisterViewRequest.userId,
      groupRegisterViewRequest.isLiked
    );
    response.status(200).send();
  } catch (error) {
    response.status(500).send({
      error: error,
    });
  }
});


router.get("/results", async (request, response) => {
  const params: any = {
    groupId: request.query.groupId,
    resultSize: request.query.resultSize,
  };
  if (!groupResultsRequestValidator(params)) {
    respondInvalidContent(response, groupResultsRequestValidator);
    return;
  }
  const groupResultsRequest = <BackendApi.GroupResultsRequest>params;

  try {
    const groupResults = await groupCarouselService.groupGetResults(
      groupResultsRequest.groupId,
      groupResultsRequest.resultSize,
    );
    response.status(200).json({ groupResults: groupResults });
  } catch (error) {
    response.status(500).json({
      error: error,
    });
  }
});

export default router;
