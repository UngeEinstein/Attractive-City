import { useEffect, useState } from "react";
import { GoCheck, GoX } from "react-icons/go";
import ReactJoyride from "react-joyride";
import { useParams } from "react-router";
import { ExperienceResult, Group } from "shared";
import { SavedAccordion } from "../components/SavedAccordion";
import { useIntro } from "../components/useIntro";
import groupService from "../services/group";
import "./GroupResultsView.css";

export const GroupResultsView = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [currentGroup, setCurrentGroup] = useState<Group>();
  const [groupViews, setGroupViews] = useState<ExperienceResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const seen = useIntro("results");

  useEffect(() => {
    groupService.getGroup(groupId).then(setCurrentGroup);
  }, [groupId]);

  useEffect(() => {
    groupService.getGroupResults(groupId).then((results) => {
      setGroupViews(results);
    });
    setIsLoading(false);
  }, [groupId]);

  const state = {
    steps: [
      {
        placement: "top" as const,
        target: ".test0",
        content:
          "This is the top pick for your group so far. Click on it to get more information about the experience",
      },
      {
        placement: "top" as const,
        target: ".results0",
        content:
          "This is how many people in your group who has voted yes or no",
      },
    ],
  };
  const { steps } = state;

  return (
    <div className="group-results__container">
      <h1>{`Group: ${currentGroup?.name || currentGroup?.groupId}`}</h1>
      <p>{`${currentGroup?.memberIds.length} members`}</p>
      {!isLoading && groupViews.length !== 0 ? (
        groupViews.map((result: ExperienceResult, index: number) => (
          <div key={result.experience.name} className={`test${index}`}>
            <div className={`group-results__results results${index}`}>
              <p className="group-results__results-icon">
                <GoCheck />
                {result.likes}
              </p>
              <p className="group-results__results-icon">
                <GoX />
                {result.dislikes}
              </p>
            </div>
            <SavedAccordion experience={result.experience} />
            {!seen && index === 0 ? (
              <ReactJoyride continuous showSkipButton steps={steps} />
            ) : null}
          </div>
        ))
      ) : (
        <p>No experiences swiped yet.</p>
      )}
    </div>
  );
};
