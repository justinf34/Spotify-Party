import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Context";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { loggedIn } = useAuth();
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(routeProps) =>
          loggedIn ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to={"/login"} />
          )
        }
      />
    </React.Fragment>
  );
};

export default PrivateRoute;
