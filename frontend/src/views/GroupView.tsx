// import Joyride from "react-joyride";

import { useEffect, useState } from "react";
import { Group } from "shared";
import groupService from "../services/group";
import { useAuthentication } from "../firebase-auth";
import Joyride from "react-joyride";
import "./GroupView.css";
import { CreateGroupCard } from "../components/CreateGroupCard";
import { useIntro } from "../components/useIntro";

export const GroupView = () => {
  const seen = useIntro("groups");
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const currentUser = useAuthentication().currentUser;
  const userId = currentUser ? currentUser.uid : "1";

  useEffect(() => {
    groupService.getGroups(userId).then(setGroupIds);
  }, [userId]);

  useEffect(() => {
    setGroups([]);
    groupIds?.forEach((id) =>
      groupService
        .getGroup(id)
        .then((group) => setGroups((groups) => [...groups, group]))
    );
  }, [groupIds]);

  const state = {
    steps: [
      {
        placement: "top-end" as const,
        target: ".button-component",
        content:
          "This button allows you to create a new group. Click on it to try!",
      },
      {
        target: ".number0",
        content:
          "These are your groups, click on one to check out more information!",
      },
    ],
  };
  const { steps } = state;

  return (
    <div className="group-content">
      <div>
        {open ? (
          <div className="group-modal">
            <div className="modal-content">
              <div className="header">
                <p onClick={() => setOpen(false)}>X</p>
              </div>
              <CreateGroupCard />
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <h1 className="group-headline">Groups</h1>
        {!seen && !open ? (
          <Joyride continuous showSkipButton steps={steps} />
        ) : null}
        <button className="button-component" onClick={() => setOpen(true)}>
          Create group
        </button>
        {groups.map((data, index) => (
          <a href={`/group/${data.groupId}`} key={data.groupId}>
            <div className={`group-container number${index}`}>
              <h3 className="group-name">{data.name || data.groupId}</h3>
              <p>{data.memberIds.length + " members"}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
