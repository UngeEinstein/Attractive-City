import { useEffect, useState } from "react";
import { Experience } from "shared";
import { InfoComponent } from "../components/InfoComponent";
import experienceService from "../services/experiences";

export const ExperienceDisplayView = () => {
  const [experience, setExperience] = useState<Experience>();
  useEffect(() => {
    let exNr = window.location.pathname.replace("/experience/", "");

    experienceService.getExperience(Number(exNr)).then(setExperience);
  }, []);
  return (
    <div>{experience ? <InfoComponent experience={experience} /> : null}</div>
  );
};
