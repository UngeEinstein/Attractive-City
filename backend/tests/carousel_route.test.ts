import Ajv from "ajv";
import supertest from "supertest";
import {
  Experience,
  experienceSchema,
  TagName,
  tagSchema,
  tagNameSchema,
} from "shared";
import { app, server } from "../index";
import { BackendApi } from "shared";
import { experienceSystem } from "../experience_controller";

const api = supertest(app);
const carouselNextPath = "/api/carousel/next";
const ajv = new Ajv();
ajv.addSchema(tagNameSchema);
ajv.addSchema(tagSchema);
ajv.addSchema(experienceSchema);
const outputValidate = ajv.compile(
  BackendApi.filteredCarouselListResponseSchema
);

beforeAll(async () => {
  await experienceSystem.resetTestDB();
});

describe("carousel next endpoint with filters (user with no views)", () => {
  it("should respond with status 200 and json as content-type", async () => {
    jest.setTimeout(10000);
    const params = {
      userId: "0",
    };
    await api
      .get(carouselNextPath)
      .query(params)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("return value should follow JSON schema in specs", async () => {
    jest.setTimeout(10000);
    const params = {
      userId: "0",
    };
    const response = await api.get(carouselNextPath).query(params);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();
  });

  it("Should return a list of filtered experiences", async () => {
    const params = {
      userId: "0",
      groupSize: 15,
      tagNames: Array<TagName>("music", "museum"),
      age: 20,
    };
    const response = await api
      .get(carouselNextPath)
      .query(params)
      .expect(200)
      .expect("Content-type", /application\/json/);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const filteredExperiences = <Experience[]>experiences;
    expect(filteredExperiences.length).toBe(1);

    filteredExperiences.forEach((experience) => {
      expect(experience.maxAge).toBeGreaterThan(params.age);
      expect(experience.minAge).toBeLessThan(params.age);
      expect(experience.maxGroupSize).toBeGreaterThan(params.groupSize);
      expect(experience.minGroupSize).toBeLessThan(params.groupSize);
    });
  });

  it("Should return a list of filtered experiences - Filtering on single tag", async () => {
    const params = {
      userId: "0",
      groupSize: 10,
      tagNames: Array<TagName>("museum"),
      age: 20,
    };
    const response = await api
      .get(carouselNextPath)
      .query(params)
      .expect(200)
      .expect("Content-type", /application\/json/);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const filteredExperiences = <Experience[]>experiences;
    expect(filteredExperiences.length).toBe(1);

    filteredExperiences.forEach((experience) => {
      expect(experience.maxAge).toBeGreaterThan(params.age);
      expect(experience.minAge).toBeLessThan(params.age);
      expect(experience.maxGroupSize).toBeGreaterThan(params.groupSize);
      expect(experience.minGroupSize).toBeLessThan(params.groupSize);
    });
  });

  it("Should return a list of filtered experiences - filter on groupsize and age", async () => {
    const params = {
      userId: "0",
      groupsize: 5,
      age: 18,
    };
    const response = await api
      .get(carouselNextPath)
      .query(params)
      .expect(200)
      .expect("Content-type", /application\/json/);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();
  });

  it("Should return a list of filtered experiences - filter on single tag only", async () => {
    const params = {
      userId: "0",
      tagNames: Array<TagName>("restaurant"),
    };
    const response = await api
      .get(carouselNextPath)
      .query(params)
      .expect(200)
      .expect("Content-type", /application\/json/);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const filteredExperiences = <Experience[]>experiences;
    expect(filteredExperiences.length).toBe(2);
  });

  it("Should return a list of all experiences in test database - filter on nothing", async () => {
    const params = {
      userId: "0",
    };
    const response = await api
      .get(carouselNextPath)
      .query(params)
      .expect(200)
      .expect("Content-type", /application\/json/);
    const experiences = response.body;
    expect(outputValidate(experiences)).toBeTruthy();

    const filteredExperiences = <Experience[]>experiences;
    expect(filteredExperiences.length).toBe(4);
  });
});

describe("Carousel next endpoint for user with views", () => {
  it("Should only recommend unseen experiences to user with views", async () => {
    const params = {
      userId: "1",
    };

    const response = await api
      .get(carouselNextPath)
      .query(params)
      .expect(200)
      .expect("Content-type", /application\/json/);
    const experiences = <Experience[]>response.body;
    expect(outputValidate(experiences)).toBeTruthy();
    expect(experiences.length).toBe(1);
    expect(experiences.map((x) => x.experienceId)).toStrictEqual([4]);
  });
});

afterAll(() => {
  server.close();
});
