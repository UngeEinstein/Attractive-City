import "./HeaderComponent.css";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Overlay,
  Tooltip,
  Dropdown,
} from "react-bootstrap";
import { Fade as Hamburger } from "hamburger-react";
import { forwardRef } from "react";
import { useAuthentication } from "../firebase-auth";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

type CustomToggleProps = {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {};
};

const CustomToggle = forwardRef(
  (props: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
    <a
      href="/"
      className="toggle"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        if (typeof props.onClick != "undefined") {
          props.onClick(e);
        }
      }}
    >
      <Hamburger color="white" />
    </a>
  )
);

interface IHeaderProps {
  logIn: (show: boolean) => void;
  showTooltip: boolean;
  setShowTooltip: (showTooltip: boolean) => void;
}

export const HeaderComponent: React.FC<IHeaderProps> = ({
  logIn,
  showTooltip,
  setShowTooltip,
}) => {
  useEffect(() => {
    //Displays tooltip if a user has swiped right on 5 experiences
    const displayTooltip = () => {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 10000);
    };
    setInnerWidth(window.innerWidth);
    if (showTooltip === true) {
      setShowTooltip(false);
      displayTooltip();
    }
  }, [showTooltip, setShowTooltip]);
  const location = useLocation();
  const checkLogin = location.pathname === "/login" ? true : false;
  const currentUser = useAuthentication().currentUser;
  const userName = currentUser?.email ?? currentUser?.uid ?? null;
  const [show, setShow] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const targetSavedExperiences = useRef(null);
  const targetHamburger = useRef(null);

  const { logout } = useAuthentication();

  return (
    <Navbar expand="md">
      <Container className="header-text-container">
        <Navbar.Toggle
          as={CustomToggle}
          aria-controls="dropdown-custom-components"
          className="toggle"
          ref={targetHamburger}
        />{" "}
        {innerWidth <= 768 ? (
          <Overlay
            target={targetHamburger.current}
            show={show}
            placement="right"
          >
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                Check out your recent saves!
              </Tooltip>
            )}
          </Overlay>
        ) : null}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/swiper">Experience swiper</Nav.Link>
            <Nav.Link href="/saved" ref={targetSavedExperiences}>
              Saved experiences
            </Nav.Link>
            {innerWidth > 768 ? (
              <Overlay
                target={targetSavedExperiences}
                show={show}
                placement="bottom"
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    Check out your recent saves!
                  </Tooltip>
                )}
              </Overlay>
            ) : null}
            <Nav.Link href="/groups">Groups</Nav.Link>
          </Nav>
          <Nav>
            {userName ? (
              <>
                <NavDropdown
                  className="navbar-user-dropdown"
                  align="end"
                  title={"User: " + userName}
                >
                  <Dropdown.Item
                    align="end"
                    className="navbar-user-dropdown-item"
                    onClick={() => logout()}
                  >
                    Log Out
                  </Dropdown.Item>
                </NavDropdown>
              </>
            ) : checkLogin ? null : (
              <Nav.Link onClick={() => logIn(true)}>Log In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
