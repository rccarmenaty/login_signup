import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
//Routing
import PrivateRoute from "./components/routing/PrivateRoute";

//Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";

const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="app">
          <Switch>
            <PrivateRoute exact path="/" component={PrivateScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
