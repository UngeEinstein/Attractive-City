import { experienceSchema } from "./../../shared/src/experience";
import { app, server } from "../index";
import supertest from "supertest";
import Ajv from "ajv";
import { BackendApi } from "shared";
import { experienceSystem } from "../experience_controller";
import {
  tagSchema,
  tagNameSchema,
  ViewedExperience,
  viewedExperienceSchema,
  viewTypeSchema,
  viewSchema,
} from "shared";

const api = supertest(app);
const basePath = "/api/experiences";

const ajv = new Ajv();
ajv.addSchema(experienceSchema);
ajv.addSchema(tagNameSchema);
ajv.addSchema(tagSchema);
ajv.addSchema(viewTypeSchema);
ajv.addSchema(viewSchema);
ajv.addSchema(viewedExperienceSchema);
const outputValidate = ajv.compile(BackendApi.experiencesListResponseSchema);

beforeEach(async () => {
  await experienceSystem.resetTestDB();
});

describe("Check that get /list endpoint works as intended", () => {
  const path = basePath + "/list";
  it("should not accept malformatted query parameters", async () => {
    await api
      .get(path)
      .query({
        viewType: "saved",
      })
      .expect(400);
    await api
      .get(path)
      .query({
        userId: "2",
        viewType: "seen",
      })
      .expect(400);
  });

  it("should return a list of ignored experiences", async () => {
    const response = await api
      .get(path)
      .query({
        userId: "1",
        viewType: "ignored",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const ignoredExperience = <ViewedExperience[]>experiences;
    expect(ignoredExperience.length).toBe(1);
    for (const experience of ignoredExperience) {
      expect(experience.viewType).toBe("ignored");
    }
  });

  it("should return a list of saved/favorited experiences", async () => {
    const response = await api
      .get(path)
      .query({
        userId: "1",
        viewType: "saved",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const savedExperiences = <ViewedExperience[]>experiences;
    expect(savedExperiences.length).toBe(2);
    for (const exp of savedExperiences) {
      expect(
        exp.viewType === "saved" || exp.viewType === "favorite"
      ).toBeTruthy();
    }
  });
});

describe("Check that post /register_view works as intended", () => {
  const path = basePath + "/register_view";
  it("should only accept json content type", async () => {
    await api
      .post(path)
      .set("Content-Type", "application/xml")
      .send("{<p>Lorem ipsum<p>}")
      .expect(400);
  });

  it("should not accept malformatted body", async () => {
    await api
      .post(path)
      .set("Content-Type", "application/json")
      .send({
        experienceId: "0",
        overwrite: "none",
        userId: "0",
        viewType: "favorite",
      })
      .expect(400);

    await api
      .post(path)
      .set("Content-Type", "application/json")
      .send({
        experienceId: 0,
        overwrite: "none",
        userId: "0",
        viewType: "new",
      })
      .expect(400);
  });
});

describe("Check that register_view requests updates the database correctly", () => {
  const registerView = basePath + "/register_view";
  const getList = basePath + "/list";
  it("Should register a favorite", async () => {
    await api
      .post(registerView)
      .set("Content-Type", "application/json")
      .send({
        experienceId: 4,
        overwrite: "conservative",
        userId: "1",
        viewType: "favorite",
      })
      .expect(200);
    const response = await api
      .get(getList)
      .query({
        userId: "1",
        viewType: "saved",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const savedExperiences = <ViewedExperience[]>experiences;
    expect(savedExperiences.map((x) => x.experienceId)).toContain(4);
  });

  it("Should overwrite favorite to ignored", async () => {
    await api
      .post(registerView)
      .set("Content-Type", "application/json")
      .send({
        experienceId: 2,
        overwrite: "conservative",
        userId: "1",
        viewType: "ignored",
      })
      .expect(200);

    let response = await api
      .get(getList)
      .query({
        userId: "1",
        viewType: "ignored",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    let experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const ignoredExperience = <ViewedExperience[]>experiences;
    expect(ignoredExperience.map((x) => x.experienceId)).toContain(2);

    response = await api
      .get(getList)
      .query({
        userId: "1",
        viewType: "saved",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const savedExperiences = <ViewedExperience[]>experiences;
    expect(savedExperiences.map((x) => x.experienceId)).not.toContain(2);
  });

  it("Should overwrite ignored to favorite", async () => {
    await api
      .post(registerView)
      .set("Content-Type", "application/json")
      .send({
        experienceId: 3,
        overwrite: "conservative",
        userId: "1",
        viewType: "favorite",
      })
      .expect(200);

    let response = await api
      .get(getList)
      .query({
        userId: "1",
        viewType: "ignored",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    let experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const ignoredExperiences = <ViewedExperience[]>experiences;
    expect(ignoredExperiences.map((x) => x.experienceId)).not.toContain(3);

    response = await api
      .get(getList)
      .query({
        userId: "1",
        viewType: "saved",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const savedExperiences = <ViewedExperience[]>experiences;
    expect(savedExperiences.map((x) => x.experienceId)).toContain(3);
  });
});

afterAll(() => {
  server.close();
});
