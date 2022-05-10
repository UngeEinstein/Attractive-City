import { GoX } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Banner } from "../components/Banner";
import { InfoComponent } from "../components/InfoComponent";
import { useSpring } from "react-spring";
import { BackendApi, Group, GroupSwipeView } from "shared";
import "./GroupTinderView.css";
import { Experience } from "shared";
import { useAuthentication } from "../firebase-auth";
import { useHistory, useParams } from "react-router";
import groupService from "../services/group";
import { useIntro } from "../components/useIntro";
import ReactJoyride from "react-joyride";

type GroupTinderViewProps = {
  setShowTooltip: (showTooltip: boolean) => void;
};

type groupParams = {
  groupId: string;
};

export const GroupTinderView = (props: GroupTinderViewProps) => {
  /**
   * The current index of experience array.
   */
  const [current, setCurrent] = useState(0);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [currentViews, setCurrentViews] = useState<GroupSwipeView[]>([]);

  // The group context of the swiping
  const { groupId } = useParams<groupParams>();
  const [currentGroup, setCurrentGroup] = useState<Group>();

  /* const bannerPos = */ useSpring({ x: 0 });
  const [swipingDirection, setSwipingDirection] = useState(0);

  //Getting userId, fallback to 1 if not logged in for now.
  const currentUser = useAuthentication().currentUser;
  const userId = currentUser ? currentUser.uid : "1";
  
  const seen = useIntro("group-swiping");

  let history = useHistory();

  useEffect(() => {
    groupService
      .getCarouselNext(userId, groupId)
      .then(setExperienceList)
      .catch(() => history.push(`/group/${groupId}`));
    setCurrent(0);
  }, [userId, groupId, history]);

  useEffect(() => {
    groupService.getGroup(groupId).then((group) => {
      setCurrentGroup(group);
    });
  }, [groupId]);

  useEffect(() => {
    if (experienceList.length > 0 && groupId) {
      groupService
        .getExperienceViews(groupId, experienceList[current].experienceId)
        .then(setCurrentViews);
    }
  }, [current, experienceList, groupId]);

  experienceList.forEach((experience) => {
    const img = new Image();
    img.src = experience.featuredPicture;
  });

  const callLikeAnimation = () => {
    setSwipingDirection(1);
  };

  const callRejectAnimation = () => {
    setSwipingDirection(-1);
  };

  // runs every time one of the three buttons are pressed
  const nextExperience = () => {
    setSwipingDirection(0);
    if (current < experienceList.length - 1) {
      if ((current + 1) % 5 === 0 && current !== 0) {
        props.setShowTooltip(true);
      }
      setCurrent(current + 1);
    } else {
      props.setShowTooltip(true);
    }
  };

  const likeExperience = () => {
    const likeInput: BackendApi.GroupSwipeRegisterViewRequest = {
      experienceId: experienceList[current].experienceId,
      userId: userId,
      groupId: groupId,
      isLiked: true,
    };
    groupService.postGroupView(likeInput);
    nextExperience();
  };

  const rejectExperience = () => {
    const rejectInput: BackendApi.GroupSwipeRegisterViewRequest = {
      experienceId: experienceList[current].experienceId,
      userId: userId,
      groupId: groupId,
      isLiked: false,
    };
    groupService.postGroupView(rejectInput);
    nextExperience();
  };

  const favoriteExperience = () => {};

  const state = {
    steps: [
      {
        placement: "top" as const,
        target: ".experience_wrapper",
        content:
          "This is a swipable experience, swipe the banner to the right if you like it and to the left if not",
      },
      {
        target: ".swipeButtons",
        content:
          "You can also click on these buttons to make your choice to either dislike or like the experience!",
      },
     
    ],
  };
  const { steps } = state;

  return (
    <div className="group-view-wrapper">
      {currentGroup && (
        <div className="group-header">
          <div className="group-name">
            <h1>{`Group: ${currentGroup?.name || currentGroup?.groupId}`}</h1>
          </div>
          <div className="group-members">
            {currentGroup.memberIds.length} members
          </div>
        </div>
      )}
      <div className="experience_wrapper">
        {experienceList.length > 0 ? (
          <Banner
            swipingDirection={swipingDirection}
            key={experienceList[current].name}
            experience={experienceList[current]}
            likeExperience={likeExperience}
            rejectExperience={rejectExperience}
            favoriteExperience={favoriteExperience}
          />
        ) : (
          <div className="expContainer"></div>
        )}
      </div>
      <div className="swipeButtons">
        <div className="swipe-button-container">
          <Button
            id="ignore-button"
            variant="Primary"
            className="swipeButton"
            onClick={callRejectAnimation}
          >
            <GoX className="swipeIcon" style={{ color: "red" }} />
          </Button>
          <p> {currentViews.filter((view) => view.isLiked).length} </p>
        </div>
        {!seen ? (
              <ReactJoyride continuous showSkipButton steps={steps} />
            ) : null}
        <div className="swipe-button-container">
          <Button
            id="like-button"
            variant="Primary"
            className="swipeButton"
            onClick={callLikeAnimation}
          >
            <GoCheck className="swipeIcon" />
          </Button>{" "}
          <p> {currentViews.filter((view) => !view.isLiked).length} </p>
        </div>
      </div>
      {experienceList.length !== 0 ? (
        <InfoComponent experience={experienceList[current]} />
      ) : null}
    </div>
  );
};
