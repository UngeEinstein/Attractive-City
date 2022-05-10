import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import experienceService from "../services/experiences";
import { ViewedExperience } from "shared";
import { useAuthentication } from "../firebase-auth";
import { SavedAccordion } from "../components/SavedAccordion";
import "./FavoriteView.css";

export const FavoriteView = () => {
  const [experienceList, setExperienceList] = useState<ViewedExperience[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  const currentUser = useAuthentication().currentUser;

  useEffect(() => {
    const userId = currentUser ? currentUser.uid : "1"; //Fallback to userId 1 if not working.
    experienceService.getSaved(userId).then(setExperienceList);
  }, [currentUser]);

  return (
    <div className="favorite-view__container">
      <h1 className="favorite-view__title">Saved experiences</h1>
      <Form className="favorite-view__checkbox">
        <Form.Check
          id="check-favorite"
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          label="Only show my favorites"
        ></Form.Check>
      </Form>
      {experienceList.length !== 0 ? (
        experienceList.map((ex) =>
          onlyFavorites && ex.viewType !== "favorite" ? (
            <></>
          ) : (
            <SavedAccordion experience={ex} key={`saved-${ex.name}`} />
          )
        )
      ) : (
        <h1> You have not liked any experiences yet! </h1>
      )}
    </div>
  );
};
