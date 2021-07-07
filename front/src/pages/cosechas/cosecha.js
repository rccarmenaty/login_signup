import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import RouteWithSubRoutesProtected from "../../components/routes/RouteWithSubRoutesProtected";

export default function Insumo({ routes }) {
  let { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutesProtected key={i} {...route} />
        ))}
        <Route exact path={`${path}`}>
          <Redirect to={`${path}/cosecha`} />
        </Route>
      </Switch>
    </div>
  );
}
