import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuthentication } from "../firebase-auth";
import groupService from "../services/group";
import "./CreateGroupCard.css";
import Joyride from "react-joyride";
import { useIntro } from "./useIntro";

/**
 * Component with a form to create new groups.
 */

export const CreateGroupCard = () => {
  const [groupName, setGroupName] = useState("");
  // const [seen, setSeen] = useState<boolean>(false);

  const currentUser = useAuthentication().currentUser;
  const seen = useIntro("create-group");

  const state = {
    steps: [
      {
        placement: "top-end" as const,
        target: ".field",
        content: "Write a cool name for your new group",
      },
      {
        target: ".button-containers",
        content: "Click here to create your group!",
      },
    ],
  };
  const { steps } = state;

  const groupNameControl = (
    <Form.Control
      maxLength={64}
      onChange={(e) => {
        setGroupName(e.currentTarget.value);
      }}
      type="text"
      value={groupName}
    />
  );

  return (
    <div className="create-group-card">
      <h1>Create group</h1>
      <Form
        onSubmit={async (event) => {
          event.preventDefault();

          if (currentUser) {
            const groupId = await groupService.createGroup(
              currentUser.uid,
              groupName
            );
            window.location.href = `/group/${groupId}`;
          }
        }}
      >
        {/* Disabled if user is not logged in. */}
        <fieldset className="field" disabled={currentUser === null}>
          {/* Alert that user must be logged in to create groups if not logged in. */}
          {currentUser === null ? (
            <Alert variant="info">Log in to create groups.</Alert>
          ) : null}
          <Form.Group>
            <Form.Label>Group name</Form.Label>
            {groupNameControl}
          </Form.Group>
          <div className="button-containers">
            <Button variant="primary" type="submit">
              Create
            </Button>
          </div>
        </fieldset>
      </Form>
      {!seen ? <Joyride continuous showSkipButton steps={steps} /> : null}
    </div>
  );
};
