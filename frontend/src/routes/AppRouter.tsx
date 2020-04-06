import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import HomeRoute from "./HomeRoute";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeRoute} />
        <Route path="/auth" exact component={AuthRoute} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
