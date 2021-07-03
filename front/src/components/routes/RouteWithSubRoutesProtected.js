import PrivateRoute from "./PrivateRoute";

const RouteWithSubRoutesProtected = (route) => {
  return (
    <PrivateRoute
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

export default RouteWithSubRoutesProtected;
