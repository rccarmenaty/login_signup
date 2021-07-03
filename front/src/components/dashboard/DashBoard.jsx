import React from "react";
import TopBar from "../topbar/TopBar";
import SideBar from "../sidebar/SideBar";
import "./dashboard.css";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import ProveedorContextProvider from "../../context/ProveedorContext";

import RouteWithSubRoutes from "../routes/RouteWithSubRoutes";
import InsumoContextProvider from "../../context/InsumoContext";
export default function DashBoard({ routes }) {
  let { path } = useRouteMatch();
  return (
    <div>
      <TopBar />
      <div className="container">
        <SideBar />
        <ProveedorContextProvider>
          <InsumoContextProvider>
            <div className="content">
              <Switch>
                {routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
                <Route exact path={`${path}`}>
                  <Redirect to="/proveedor" />
                </Route>
              </Switch>
            </div>
          </InsumoContextProvider>
        </ProveedorContextProvider>
      </div>
    </div>
  );
}
