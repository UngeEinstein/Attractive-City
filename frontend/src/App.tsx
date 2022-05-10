import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TinderView } from "./views/TinderView";
import { FavoriteView } from "./views/FavoriteView";
import { ExperienceDisplayView } from "./views/ExperienceDisplayView";
import { HeaderComponent } from "./components/HeaderComponent";
import { useAuthentication } from "./firebase-auth";
import { LoggedInRoute } from "./components/UserRoute";
import { LoginView } from "./views/LoginView";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import { GroupHubView } from "./views/GroupHubView";
import { GroupView } from "./views/GroupView";
import { GroupTinderView } from "./views/GroupTinderView";
import { HomePage } from "./views/HomePage";
import { GroupResultsView } from "./views/GroupResultsView";

function App() {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showModal, setShow] = useState<boolean>(false);
  const { currentUser } = useAuthentication();
  const closeModal = () => {
    setShow(false);
  };
  return (
    <div>
      <Router>
        <HeaderComponent
          logIn={setShow}
          showTooltip={showTooltip}
          setShowTooltip={setShowTooltip}
        />
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginView} />

            <LoggedInRoute
              path="/swiper"
              component={TinderView}
              setShowTooltip={setShowTooltip}
            />
            <LoggedInRoute path="/saved" component={FavoriteView} />
            <LoggedInRoute
              path="/experience"
              component={ExperienceDisplayView}
            />
            <LoggedInRoute path="/groups" component={GroupView} />
            <LoggedInRoute
              path="/group/results/:groupId"
              component={GroupResultsView}
            />
            <LoggedInRoute
              path="/group/swiper/:groupId"
              component={GroupTinderView}
              setShowTooltip={() => {}}
            />
            <LoggedInRoute path="/group/:groupId" component={GroupHubView} />
          </Switch>
        </div>
        <Modal show={showModal && !currentUser}>
          <Modal.Header closeVariant="white" className="login-header">
            Log in / Create user
            <ImCross
              style={{ cursor: "pointer" }}
              onClick={() => closeModal()}
            />
          </Modal.Header>
          <LoginView />
        </Modal>
      </Router>
    </div>
  );
}
export default App;
