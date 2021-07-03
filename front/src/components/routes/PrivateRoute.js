import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("authToken");

  return token ? (
    <Route component={props.component} {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
