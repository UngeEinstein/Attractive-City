import { GoStar } from "react-icons/go";
import { GoX } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Banner } from "../components/Banner";
import { InfoComponent } from "../components/InfoComponent";
import { dummyExperienceList } from "../dummyData";
import experienceService from "../services/experiences";
import carouselService from "../services/carousel";
import { useSpring } from "react-spring";
import { BackendApi } from "shared";
import { FaFilter } from "react-icons/fa";
import "./TinderView.css";
import { FilterOffCanvas } from "../components/FilterOffCanvas";
import { Experience, Tag } from "shared";
import { useAuthentication } from "../firebase-auth";
import Joyride from "react-joyride";
import { useIntro } from "../components/useIntro";
import { LoadingIndicator } from "../components/LoadingIndicator";

/*
 * A configuration of filters for experiences in the experience carousel.
 */
export interface FilterConfig {
  /**
   * The age that should be viewed up against experience age requirements.
   */
  age?: number;

  /**
   * The preferable group size for an experience.
   */
  groupSize?: number;

  /**
   * The tags to require experiences to have.
   */
  tags: Tag[];
}

type TinderViewProps = {
  setShowTooltip: (showTooltip: boolean) => void;
};

export const TinderView = (props: TinderViewProps) => {
  /**
   * The current index of experience array.
   */
  const [current, setCurrent] = useState(0);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);

  const [filters, setFilters] = useState<FilterConfig>({ tags: [] });
  const [isFiltersShown, setIsFiltersShown] = useState<boolean>(false);
  const seen = useIntro("swiper");

  const handleReplaceFilters = (filters: FilterConfig) => {
    setFilters(filters);
  };

  /* const bannerPos = */ useSpring({ x: 0 });
  const [swipingDirection, setSwipingDirection] = useState(0);

  //Getting userId, fallback to 1 if not logged in for now.
  const currentUser = useAuthentication().currentUser;
  const userId = currentUser ? currentUser.uid : "1";

  useEffect(() => {
    carouselService
      .getNext(userId, filters)
      .then(setExperienceList)
      .catch(() => setExperienceList(dummyExperienceList));
    setCurrent(0);
  }, [filters, userId]);

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

  const callFavoriteAnimation = () => {
    setSwipingDirection(2);
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
    const viewInput: BackendApi.ExperiencesRegisterViewRequest = {
      experienceId: experienceList[current].experienceId,
      overwrite: "conservative",
      userId: userId,
      viewType: "saved",
    };
    experienceService.postView(viewInput);
    nextExperience();
  };

  const rejectExperience = () => {
    const viewInput: BackendApi.ExperiencesRegisterViewRequest = {
      experienceId: experienceList[current].experienceId,
      overwrite: "conservative",
      userId: userId,
      viewType: "ignored",
    };
    experienceService.postView(viewInput);
    nextExperience();
  };

  const favoriteExperience = () => {
    const viewInput: BackendApi.ExperiencesRegisterViewRequest = {
      experienceId: experienceList[current].experienceId,
      overwrite: "conservative",
      userId: userId,
      viewType: "favorite",
    };
    experienceService.postView(viewInput);
    nextExperience();
  };

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
          "You can also click on these buttons to make your choice to either dislike, favorite or like the experience!",
      },
      {
        target: ".open_filters_button",
        content:
          "This button will allow you to filter the experiences shown based on your preference",
      },
      {
        target: ".infocomponent-container",
        content:
          "If you want more information about an experience, you can always scroll down to read more",
      },
    ],
  };
  const { steps } = state;

  return (
    <div className="view_wrapper">
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
          <LoadingIndicator />
        )}
      </div>
      <Button
        className="open_filters_button"
        onClick={() => {
          setIsFiltersShown(true);
        }}
      >
        <FaFilter />
      </Button>
      <FilterOffCanvas
        filterConfig={filters}
        handleReplaceFilters={handleReplaceFilters}
        isShown={isFiltersShown}
        setShown={setIsFiltersShown}
      />
      <div className="swipeButtons">
        <Button
          id="ignore-button"
          variant="Primary"
          className="swipeButton"
          onClick={callRejectAnimation}
        >
          <GoX className="swipeIcon" style={{ color: "red" }} />
        </Button>
        <Button
          id="favorite-button"
          variant="Primary"
          className="swipeButton"
          onClick={callFavoriteAnimation}
        >
          <GoStar className="swipeIcon" style={{ color: "#2da4db" }} />
        </Button>{" "}
        <Button
          id="like-button"
          variant="Primary"
          className="swipeButton"
          onClick={callLikeAnimation}
        >
          <GoCheck className="swipeIcon" />
        </Button>{" "}
      </div>
      {!seen ? <Joyride continuous showSkipButton steps={steps} /> : null}
      {experienceList.length !== 0 ? (
        <div className="infocomponent-container">
          <InfoComponent experience={experienceList[current]} />
        </div>
      ) : null}
    </div>
  );
};
