import React, { useRef, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { Experience, ViewedExperience } from "shared";
import { SavedOffCanvas } from "./SavedOffCanvas";
import "./SavedAccordion.css";

interface Props {
  experience: ViewedExperience | Experience;
}

/**
 * An accordion that displays a saved (liked or favorite) experience.
 */

export const SavedAccordion: React.FC<Props> = ({ experience }) => {
  const [isOffCanvasShown, setIsOffCanvasShown] = useState<boolean>(false);
  const target = useRef(null);

  return (
    <Accordion flush>
      <Accordion.Item eventKey={experience.name}>
        <Accordion.Header>
          <img
            className="saved-accordion__image"
            alt={`${experience.name}`}
            src={experience.featuredPicture}
          />
          <h1 className="saved-accordion__title">{experience.name}</h1>
        </Accordion.Header>
        <Accordion.Body className="saved-accordion__body">
          <div className="saved-accordion__description">
            {experience.description}
          </div>
          <Button onClick={() => setIsOffCanvasShown(true)} ref={target}>
            Show detailed description
          </Button>
          <SavedOffCanvas
            experience={experience}
            isShown={isOffCanvasShown}
            setIsShown={setIsOffCanvasShown}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
