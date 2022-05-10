import { Banner } from "../Banner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { dummyExperienceList } from "../../dummyData";
import { Experience } from "shared";

describe("CardComponent", () => {
  const experience: Experience = dummyExperienceList[0];

  test("renders correct experience name", () => {
    render(
      <Banner
        experience={experience}
        favoriteExperience={() => {}}
        likeExperience={() => {}}
        rejectExperience={() => {}}
      />
    );
    expect(screen.getByText(experience.name)).toHaveTextContent(
      "Old Town Bridge"
    );
  });

  test("renders correct image", () => {
    render(
      <Banner
        experience={experience}
        favoriteExperience={() => {}}
        likeExperience={() => {}}
        rejectExperience={() => {}}
      />
    );
    expect(document.querySelectorAll("img")[0].src).toBe(
      experience.featuredPicture
    );
  });
});
