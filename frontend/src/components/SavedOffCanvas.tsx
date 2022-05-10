import { Offcanvas } from "react-bootstrap";
import { Experience, ViewedExperience } from "shared";
import { InfoComponent } from "./InfoComponent";
import "./SavedOffCanvas.css";

interface Props {
  experience: ViewedExperience | Experience;
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
}

/**
 * An offcanvas that shows detailed information about the selected experience.
 */

export const SavedOffCanvas: React.FC<Props> = ({
  experience,
  isShown,
  setIsShown,
}) => {
  return (
    <Offcanvas
      className="saved-offcanvas__container"
      show={isShown}
      onHide={() => setIsShown(false)}
    >
      <Offcanvas.Header className="saved-offcanvas__header" closeButton>
        <Offcanvas.Title>{experience.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="saved-offcanvas__body">
        <InfoComponent experience={experience} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};
