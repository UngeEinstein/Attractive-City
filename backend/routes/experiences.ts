import Ajv from "ajv";
import express, { response } from "express";
import { respondInvalidContent, respondWrongContentType } from "../endpoint";
import { experienceSystem } from "../experience_controller";
import { BackendApi } from "shared";
import { MYSQL_CONFIG, DATABASE_TEST } from "../utils/config";

const router = express.Router();

const ajv = new Ajv();
const listRequestValidate = ajv.compile(
  BackendApi.experiencesListRequestSchema
);
const registerViewValidate = ajv.compile(
  BackendApi.experiencesRegisterViewRequestSchema
);

router.get("/list", async (request, response) => {
  const params: any = {
    userId: request.query.userId,
    viewType: request.query.viewType,
  };

  // Validate request against specifications.
  if (!listRequestValidate(params)) {
    respondInvalidContent(response, listRequestValidate);
    return;
  }

  // Cast validated request to TypeScript type.
  const listRequest = <BackendApi.ExperiencesListRequest>params;

  switch (listRequest.viewType) {
    case "ignored":
      response.json(await experienceSystem.getIgnored(listRequest.userId));
      break;
    case "saved":
      response.json(await experienceSystem.getSaved(listRequest.userId));
      break;
  }
});

router.get("/experience", async (request, response) => {
  response.json(
    await experienceSystem.getExperience(Number(request.query.experienceId))
  );
});

router.post("/register_view", async (request, response) => {
  if (!request.is("application/json")) {
    respondWrongContentType(response);
    return;
  }

  // Validate request against specifications.
  if (!registerViewValidate(request.body)) {
    respondInvalidContent(response, registerViewValidate);
    return;
  }

  // Cast validated request to TypeScript type.
  const registerViewRequest = <BackendApi.ExperiencesRegisterViewRequest>(
    request.body
  );

  try {
    await experienceSystem.registerView(
      registerViewRequest.experienceId,
      registerViewRequest.overwrite,
      registerViewRequest.userId,
      registerViewRequest.viewType
    );

    response.status(200).send();
  } catch (error) {
    response.status(400).json({
      error: error,
    });
  }
});

if (MYSQL_CONFIG.database === DATABASE_TEST) {
  router.get("/reset/testDB", async () => {
    await experienceSystem.resetTestDB();
    response.status(200).send();
  });
}

export default router;
