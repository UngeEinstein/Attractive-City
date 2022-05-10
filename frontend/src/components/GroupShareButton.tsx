import React, { useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { FiClipboard } from "react-icons/fi";
import { BsPersonPlus } from "react-icons/bs";
import "./GroupShareButton.css";

interface IGroupShareButtonProps {
  link: string;
}

export const GroupShareButton: React.FC<IGroupShareButtonProps> = ({
  link,
}) => {
  const [tooltip, setTooltip] = useState<string>("Copy to clipboard");

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(link);
    setTooltip("Copied to clipboard");
    setTimeout(() => {
      setTooltip("Copy to clipboard");
    }, 3000);
  };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="auto"
        overlay={
          <Popover id="popover-basic">
            <Popover.Header>Copy link and share with friends!</Popover.Header>
            <Popover.Body>
              <input value={link} readOnly />
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip> {tooltip} </Tooltip>}
                delay={{ show: 0, hide: 100 }}
              >
                <Button
                  variant="outline-primary"
                  onClick={copyToClipBoard}
                  className="m-1"
                >
                  <FiClipboard />
                </Button>
              </OverlayTrigger>
            </Popover.Body>
          </Popover>
        }
        rootClose
      >
        <Button variant="outline-dark">
          <BsPersonPlus />
        </Button>
      </OverlayTrigger>
    </>
  );
};
