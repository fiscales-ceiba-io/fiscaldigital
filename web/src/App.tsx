import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Compare, Create, Home, routes, SignIn, Validate } from "./pages";

const App: React.FC = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path={routes.auth.create} component={Create} />
    <Route path={routes.auth.signIn} component={SignIn} />
    <Route path={routes.auth.validate} component={Validate} />
    <Route path={routes.audit.compare} component={Compare} />
  </Router>
);

export default App;
