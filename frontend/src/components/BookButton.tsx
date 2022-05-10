import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Toast from "react-bootstrap/Toast";
import { Experience } from "shared";

interface IBookButtonProps {
  experience: Experience;
}

export const BookButton: React.FC<IBookButtonProps> = ({ experience }) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  // const [isBooked, setIsBooked] = useState<boolean>(false); // Check if the experience is already booked (currently not in use)
  const target = useRef(null);

  const buttonOnClick = () => {
    setShowMessage(true);
  };

  return (
    <>
      <Button onClick={buttonOnClick} ref={target}>
        Book now
      </Button>
      <Overlay target={target.current} show={showMessage} placement="bottom">
        <Toast
          onClose={() => setShowMessage(false)}
          show={showMessage}
          delay={3000}
          autohide
          style={{ textAlign: "center", padding: "5px" }}
        >
          <b>Thank you for the booking!</b> The experience {experience.name} is
          waiting for you. Enjoy!
        </Toast>
      </Overlay>
    </>
  );
};
