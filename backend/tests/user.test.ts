import supertest from "supertest";
import { app, server } from "../index";

const api = supertest(app);
const userPath = "/api/user";

describe("User endpoint should not accept invalid requests", () => {
  it("should only accept json content type", async () => {
    await api
      .post(userPath + "/register_user")
      .set("Content-Type", "application/xml")
      .send("{<p>Lorem ipsum<p>}")
      .expect(400);
  });

  it("should not accept body missing userId", async () => {
    await api
      .post(userPath + "/register_user")
      .set("Content-Type", "application/json")
      .send({
        email: "test@123.no",
      })
      .expect(400);
  });
});

describe("Check that create user works as intended", () => {
  it("should return with status 200 OK when creating ordinary user", async () => {
    await api
      .post(userPath + "/register_user")
      .set("Content-Type", "application/json")
      .send({
        userId: "abc",
        email: "testuser@test.no",
      })
      .expect(200);

    const response = await api
      .get(userPath + "/user")
      .query({
        userId: "abc",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body[0].userID).toBe("abc");
    expect(response.body[0].email).toBe("testuser@test.no");
  });

  it("should return with status 200 OK when creating anonymous user", async () => {
    await api
      .post(userPath + "/register_user")
      .set("Content-Type", "application/json")
      .send({
        userId: "abcd",
        email: "null",
      })
      .expect(200);
    const response = await api
      .get(userPath + "/user")
      .query({
        userId: "abcd",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body[0].userID).toBe("abcd");
  });

  it("should return with status 400 Bad request when creating user with same id", async () => {
    await api
      .post(userPath + "/register_user")
      .set("Content-Type", "application/json")
      .send({
        userId: "abcde",
        email: "testuser@test.no",
      })
      .expect(400)
      .then(async () => {
        await api
          .post(userPath + "/register_user")
          .set("Content-Type", "application/json")
          .send({
            userId: "abcde",
            email: "testuser@test.no",
          });
      });
  });
  afterAll(() => {
    server.close();
  });
});
