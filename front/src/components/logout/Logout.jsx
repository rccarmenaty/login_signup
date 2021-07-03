import React from "react";
import { Switch, Redirect, useRouteMatch, Route } from "react-router-dom";

export default function Logout() {
  const { path } = useRouteMatch();
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");

  return (
    <Route exact path={`${path}`}>
      <Redirect to="/login" />
    </Route>
  );
}
