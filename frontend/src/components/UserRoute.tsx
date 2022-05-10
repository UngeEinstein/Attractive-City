import { Route, Redirect } from "react-router-dom";
import { useAuthentication } from "../firebase-auth";

export const LoggedInRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { currentUser } = useAuthentication();
  const setShowTooltip =
    rest.setShowTooltip !== undefined ? rest.setShowTooltip : null;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !currentUser ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { lastPath: window.location.href },
            }}
          />
        ) : setShowTooltip !== null ? (
          <RouteComponent {...routeProps} setShowTooltip={setShowTooltip} />
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  );
};
