import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ViewedExperience } from "shared";
import experienceService from "../services/experiences";
import { useAuthentication } from "../firebase-auth";
import "./SavedComponent.css";
interface savedProps {
  setViewExperiences: (viewExperiences: boolean) => void;
}

export const SavedComponent = (props: savedProps) => {
  const [experienceList, setExperienceList] = useState<ViewedExperience[]>([]);

  const currentUser = useAuthentication().currentUser;

  useEffect(() => {
    const userId = currentUser ? currentUser.uid : "1";
    experienceService.getSaved(userId).then(setExperienceList);
  }, [currentUser]);
  return (
    <div style={{ margin: "1vh auto", width: "60%", textAlign: "center" }}>
      {/*Displays the last 5 experiences a person liked*/}
      {experienceList
        .slice(experienceList.length - 6, experienceList.length - 1)
        .map((ex) => (
          <Link to={`/experience/${ex.experienceId}`}>
            <div className="experience-map">
              <img
                style={{ height: "10vh", width: "10vw" }}
                alt="experience"
                src={ex.featuredPicture}
              />
              <h3 style={{ fontWeight: "bold", marginLeft: "1vw" }}>
                {ex.name.toUpperCase()}
              </h3>
            </div>
          </Link>
        ))}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/saved" className="saved-button">
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "white",
            }}
          >
            Yes
          </button>
        </Link>
        <button
          className="saved-button"
          onClick={() => props.setViewExperiences(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};
