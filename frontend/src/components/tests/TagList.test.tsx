import { render, screen } from "@testing-library/react";
import { Tag } from "shared";
import { TagList } from "../TagList";

describe("TagList", () => {
  it("should show the name of one supplied tag", async () => {
    const tagList: Tag[] = [{ description: "", name: "museum" }];
    render(<TagList tags={tagList} />);
    expect(await screen.getByText("museum")).toBeVisible();
  });

  it("should show the names of three supplied tags", async () => {
    const tagList: Tag[] = [
      { description: "", name: "museum" },
      { description: "", name: "location:center" },
      { description: "", name: "indoor" },
    ];
    render(<TagList tags={tagList} />);
    expect(await screen.getByText("museum")).toBeVisible();
    expect(await screen.getByText("center")).toBeVisible();
    expect(await screen.getByText("indoor")).toBeVisible();
  });

  it("should sort tags alphabetically by name", async () => {
    const tagList: Tag[] = [
      { description: "", name: "price:paid" },
      { description: "", name: "music" },
      { description: "", name: "price:free" },
      { description: "", name: "culture" },
    ];
    render(<TagList tags={tagList} />);
    const tagListElement = document.querySelectorAll(".tag_list")[0];
    expect(tagListElement.children[0].innerHTML).toContain("culture");
    expect(tagListElement.children[1].innerHTML).toContain("music");
    // Price tags are sorted by folder "price", so appear after "music" tag.
    expect(tagListElement.children[2].innerHTML).toContain("free");
    expect(tagListElement.children[3].innerHTML).toContain("paid");
  });
});
