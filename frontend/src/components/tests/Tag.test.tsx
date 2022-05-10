import { render, screen } from "@testing-library/react";
import { Tag } from "../Tag";

describe("Tag component", () => {
  it("should display name of input basic tag", async () => {
    render(<Tag tag={{ description: "", name: "culture" }} />);
    expect(await screen.findByText("culture")).toBeVisible();
  });
  it("should display name of input folder tag", async () => {
    render(<Tag tag={{ description: "", name: "fit_for:adults" }} />);
    expect(await screen.findByText("adults")).toBeVisible();
  });
});
