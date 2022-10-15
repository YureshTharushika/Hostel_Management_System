import { Route, Navigate } from "react-router-dom";
import { VIEWS } from "../../utils";

const PrivateRoute = ({ component: Component, ...rest }:any) => {
  return (
    <Route
      {...rest}
      render={(props:any) =>
        localStorage.getItem("authToken") ? (
          <Component {...props} />
        ) : (
          <Navigate to={VIEWS.HOME} />
        )
      }
    />
  );
};

export default PrivateRoute;