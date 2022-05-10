import { BookButton } from "./BookButton";
import React, { useEffect, useState } from "react";
import { GoX, GoCheck, GoStar } from "react-icons/go";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { Experience } from "shared";
import { TagList } from "./TagList";
import "./Banner.css";
import { LoadingIndicator } from "./LoadingIndicator";

interface IBannerProps {
  experience: Experience;
  favoriteExperience: () => void;
  likeExperience: () => void;
  rejectExperience: () => void;
  swipingDirection?: number;
}

/**
 * Element that shows a big but shallow presentation of an experience. Meant to be used in the experiences carousel.
 */

export const Banner: React.FC<IBannerProps> = ({
  experience,
  favoriteExperience,
  likeExperience,
  rejectExperience,
  swipingDirection,
}) => {
  // Determines if like, reject or favorite has been pressed
  useEffect(() => {
    if (swipingDirection === 1 || swipingDirection === -1) {
      swipeAnimation(swipingDirection);
    } else if (swipingDirection === 2) {
      favoriteAnimation();
    }
  });

  //Is the experience image loaded
  const [isLoading, setIsLoading] = useState(true);
  const imageStyle = { display: isLoading ? "none" : "flex" };
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bannerPos = useSpring({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 500, friction: 25 },
  });

  const imageLoaded = () => {
    setIsLoading(false);
  };

  const swipeAnimation = (direction: number) => {
    bannerPos.x.start(screenWidth * 2 * direction, {
      config: { friction: 100 },
    });

    setTimeout(() => {
      setIsLoading(true);
    }, 150);

    if (direction === -1) {
      setTimeout(() => {
        rejectExperience();
      }, 500);
    } else {
      setTimeout(() => {
        likeExperience();
      }, 500);
    }
  };

  const favoriteAnimation = () => {
    bannerPos.y.start(-screenHeight * 2);
    setTimeout(() => {
      favoriteExperience();
    }, 500);
  };

  // Determines the banners position when dragged/swiped
  const bindBannerPos = useDrag((params) => {
    const velocity = params.velocities[0];
    const directionParam = params.direction[0];
    const direction = Math.sign(directionParam);
    const trigger = Math.abs(velocity) > 0.8;
    const down = params.down;
    const x = down ? params.movement[0] : 0;
    bannerPos.x.start(x);

    if (!down && trigger && direction !== 0) {
      swipeAnimation(direction);
    }
  });

  const cardProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });

  return (
    <div className="banner__container">
      {isLoading ? <LoadingIndicator /> : null}
      {
        <animated.div style={cardProps}>
          <animated.div
            {...bindBannerPos()}
            style={{
              rotate: bannerPos.x.to([0, screenWidth], [0, 5]),
              x: bannerPos.x,
              y: bannerPos.y,
            }}
            className="banner__rotation-container"
          >
            <img
              draggable="false"
              style={imageStyle}
              src={experience.featuredPicture}
              alt={`${experience.name}`}
              onLoad={imageLoaded}
            />
            <div>
              <animated.div
                className="banner__view-type-indicator-container"
                style={{
                  opacity: bannerPos.x.to([0, -screenWidth], [0, 5]),
                }}
              >
                <GoX
                  className="banner__view-type-indicator"
                  style={{ color: "red" }}
                ></GoX>
              </animated.div>
              <animated.div
                className="banner__view-type-indicator-container"
                style={{
                  opacity: bannerPos.y.to([0, -screenHeight], [0, 5]),
                }}
              >
                <GoStar
                  className="banner__view-type-indicator"
                  style={{ color: "#2da4db" }}
                />
              </animated.div>
              <animated.div
                className="banner__view-type-indicator-container"
                style={{
                  opacity: bannerPos.x.to([0, screenWidth], [0, 5]),
                }}
              >
                <GoCheck
                  className="banner__view-type-indicator"
                  style={{ color: "green" }}
                ></GoCheck>
              </animated.div>
            </div>
            <div className="banner__info-pane">
              <div className="banner_info-pane-column">
                <h1 className="banner__experience-title">{experience.name}</h1>
                <TagList tags={experience.tags} />
                <span className="banner__experience-description">
                  {experience.description}
                </span>
              </div>
              <BookButton experience={experience} />
            </div>
          </animated.div>
        </animated.div>
      }
    </div>
  );
};
