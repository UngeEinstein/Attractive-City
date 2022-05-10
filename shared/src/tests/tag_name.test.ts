import Ajv from "ajv";
import { tagNameSchema } from "../tag_name";

const ajv = new Ajv();
const tagNameValidator = ajv.compile(tagNameSchema);

describe("json schemas", () => {
  it("tag name schema should accept valid tag names", () => {
    expect(tagNameValidator("location:suburban")).toBeTruthy();
    expect(tagNameValidator("nature")).toBeTruthy();
  });

  it("tag name schema should not accept invalid tag names", () => {
    expect(tagNameValidator("price")).toBeFalsy();
    expect(tagNameValidator("pricefree")).toBeFalsy();
    expect(
      tagNameValidator({
        price: "free",
      })
    ).toBeFalsy();
    expect(tagNameValidator("æøå")).toBeFalsy();
  });
});
