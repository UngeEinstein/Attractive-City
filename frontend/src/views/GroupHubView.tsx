import { GroupShareButton } from "../components/GroupShareButton";
import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { BackendApi, Group } from "shared";
import groupService from "../services/group";
import { useHistory, useParams } from "react-router";
import "./GroupHubView.css";
import { BsPersonFill } from "react-icons/bs";
import { useAuthentication } from "../firebase-auth";
import Button from "react-bootstrap/Button";
import ReactJoyride from "react-joyride";
import { useIntro } from "../components/useIntro";

type groupParams = {
  groupId: string;
};

export const GroupHubView = () => {
  const { groupId } = useParams<groupParams>();
  const groupHubLink = window.location.host + "/group/" + groupId;

  const [currentGroup, setCurrentGroup] = useState<Group>();
  const currentUser = useAuthentication().currentUser;
  const [currentUserInGroup, setCurrentUserInGroup] = useState<Boolean>(false);

  const [loaded, setLoaded] = useState<Boolean>(false);
  const seen = useIntro("group-members");

  let history = useHistory();

  useEffect(() => {
    groupService.getGroup(groupId).then((group) => {
      setCurrentGroup(group);
    });
  }, [groupId]);

  useEffect(() => {
    groupService.getGroup(groupId).then((group) => {
      if (currentUser && group.memberIds.includes(currentUser.uid)) {
        setCurrentUserInGroup(true);
      }
      setLoaded(true);
    });
  }, [groupId, currentUser, currentGroup?.memberIds]);

  const joinGroup = async () => {
    if (currentUser) {
      const groupAddMemberInput: BackendApi.GroupAddMemberRequest = {
        groupId: groupId,
        userId: currentUser.uid,
      };
      await groupService.addGroupMember(groupAddMemberInput);
      const group = await groupService.getGroup(groupId);
      setCurrentGroup(group);
    }
  };

  function redirectHome() {
    history.push("/");
  }

  function redirectToSwiper() {
    history.push(`/group/swiper/${groupId}`);
  }
  function redirectToResults() {
    history.push(`/group/results/${groupId}`);
  }

  const state = {
    steps: [
      {
        placement: "top" as const,
        target: ".share-button",
        content: "Click here to add more people to your group",
      },
      {
        placement: "top" as const,
        target: ".swiper-button",
        content: "This button will take you to the decision making tool",
      },
      {
        placement: "top" as const,
        target: ".results-button",
        content: "This button will take you to the group results",
      },
    ],
  };
  const { steps } = state;

  return (
    <>
      {loaded && (
        <Container className="group-hub-container">
          {currentUserInGroup && (
            <>
              <h1> {currentGroup?.name || currentGroup?.groupId} </h1>
              <hr />
              <div className="member-info">
                <h3> Members </h3>
                <div className="share-button">
                  <GroupShareButton link={groupHubLink} />
                </div>
              </div>
              <Col>
                {currentGroup?.memberIds.map((user) => (
                  <div className="member-info" key={user}>
                    <BsPersonFill />
                    {user}
                  </div>
                ))}
              </Col>
              <div
                className="swiper-button"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                <Button onClick={redirectToSwiper}>
                  Go to group experience swiper!
                </Button>
              </div>
              {!seen ? <ReactJoyride showSkipButton steps={steps} /> : null}
              <div
                className="results-button"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                <Button onClick={redirectToResults}>
                  Go to group results!
                </Button>
              </div>
            </>
          )}

          <Modal show={!currentUserInGroup}>
            <Modal.Header closeVariant="white" className="login-header">
              Do you want to join this group?
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Button className="top-btn-modal" onClick={joinGroup}>
                  Join group
                </Button>
                <Button onClick={redirectHome}> Not now </Button>
              </Row>
            </Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
};
