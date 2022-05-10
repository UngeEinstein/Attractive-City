import { tagValues } from "../tag";

describe("models", () => {
  it("keys in tag values should coincide with name of associated tag", () => {
    for (const [key, value] of Object.entries(tagValues)) {
      expect(key).toBe(value.name);
    }
  });

  it("tags in tag values should not have empty descriptions", () => {
    for (const [key, value] of Object.entries(tagValues)) {
      expect(value.description).toBeTruthy();
    }
  });
});
