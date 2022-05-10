import { BookButton } from "../BookButton";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { dummyExperienceList } from "../../dummyData";
import { Experience } from "shared";

describe("BookButton", () => {
  const experience: Experience = dummyExperienceList[0];

  test("renders correctly when clicked", async () => {
    render(<BookButton experience={experience} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      screen.getByRole("alert");
    });
    expect(screen.getByRole("alert")).toHaveTextContent("book");
  });
});
