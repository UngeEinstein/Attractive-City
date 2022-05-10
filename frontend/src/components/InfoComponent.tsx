import { BookButton } from "../components/BookButton";
import { FiUser, FiUsers } from "react-icons/fi";
import "./infoComponent.css";
import { Experience } from "shared";

interface InfoComponentProps {
  experience: Experience;
}

export const InfoComponent = (props: InfoComponentProps) => {
  return (
    <div className="info-component">
      <img
        className="head-image"
        src={props.experience.featuredPicture}
        alt="display of experience"
      />
      <div className="information-container">
        <div className="text-container">
          <div className="name-container">
            <h1>{props.experience.name.toUpperCase()}</h1>
            <h2>{props.experience.description}</h2>
          </div>
          <div className="general-information">
            <div className="number-container">
              <FiUser />
              <p>{`${props.experience.minAge} - ${props.experience.maxAge} years old`}</p>
            </div>
            <div className="number-container">
              <FiUsers />
              <p>
                {`Group of ${props.experience.minGroupSize} - ${
                  props.experience.maxGroupSize === 0
                    ? "∞"
                    : props.experience.maxGroupSize
                }`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" description">
        <p>{props.experience.detailedDescription}</p>
        <BookButton experience={props.experience} />
      </div>

      <div className="basic-info-container">
        <div className="basic-info">
          <p>{props.experience.address}</p>
          <a href={`tel:${props.experience.phone}`}>
            <p>{props.experience.phone}</p>
          </a>
          <a href={props.experience.website}>
            <p>{props.experience.website}</p>
          </a>
        </div>
      </div>
    </div>
  );
};
