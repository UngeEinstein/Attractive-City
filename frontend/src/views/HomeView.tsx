import { useEffect, useState } from "react";
import { Carousel, Container, Row } from "react-bootstrap";
import { Experience } from "shared";
import { dummyExperienceList } from "../dummyData";
import carouselService from "../services/carousel";
import { useAuthentication } from "../firebase-auth";
import "./HomeView.css";

export const HomeView = () => {
  const [experienceList, setExperienceList] = useState<Experience[]>([]);

  const currentUser = useAuthentication().currentUser;

  useEffect(() => {
    const userId = currentUser ? currentUser.uid : "1";

    carouselService
      .getNext(userId, { tags: [] })
      .then(setExperienceList)
      .catch(() => setExperienceList(dummyExperienceList));
  }, [currentUser]);

  return (
    <>
      {experienceList.length !== 0 ? (
        <Container className="homeContainer" style={{ border: "none" }}>
          <Row className="carousel">
            <Carousel>
              {[0, 1, 2].map((i) => (
                <Carousel.Item>
                  <a href={`/experience/${experienceList[i].experienceId}`}>
                    <img
                      className="d-block w-100"
                      src={experienceList[i].featuredPicture}
                      alt={experienceList[i].name}
                    />
                  </a>
                  <Carousel.Caption style={{ backgroundColor: "#0006" }}>
                    <h3>{experienceList[i].name}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
          <Row className=".image-container">
            {[
              Math.floor(Math.random() * experienceList.length),
              Math.floor(Math.random() * experienceList.length),
              Math.floor(Math.random() * experienceList.length),
            ].map((i) => (
              <img
                alt={experienceList[i].name}
                className="column-image"
                src={experienceList[i].featuredPicture}
              />
            ))}
          </Row>
        </Container>
      ) : null}
    </>
  );
};
