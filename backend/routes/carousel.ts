import { carouselController } from "../carousel_controller";
import express from "express";
import Ajv from "ajv";
import { respondInvalidContent } from "../endpoint";
import { BackendApi, TagName, tagNameSchema } from "shared";

const router = express.Router();

const ajv = new Ajv();
ajv.addSchema(tagNameSchema);
const filterListRequestValidate = ajv.compile(
  BackendApi.filteredCarouselListRequestSchema
);

router.get("/next", async (request, response) => {
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
    userId: String(request.query.userId),
    age:
      request.query.age !== undefined ? Number(request.query.age) : undefined,
    tagNames: tagNames,
    groupSize:
      request.query.groupSize !== undefined
        ? Number(request.query.groupSize)
        : 0,
  };

  //Validate request against specifications.
  if (!filterListRequestValidate(params)) {
    respondInvalidContent(response, filterListRequestValidate);
    return;
  }

  const filterListRequest = <BackendApi.FilteredCarouselListRequest>params;

  response.json(
    await carouselController.getFilteredExperiences(
      filterListRequest.userId,
      filterListRequest.tagNames,
      filterListRequest.groupSize,
      filterListRequest.age
    )
  );
});

export default router;
