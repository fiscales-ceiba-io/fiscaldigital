import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Compare, Create, Home, routes, SignIn, Validate } from "./pages";
import { FAQs, Prices } from "./pages/Home";
import { HerbrugerPrice } from "./pages/Prices";

const App: React.FC = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path={routes.home.faqs} component={FAQs} />
    <Route path={routes.home.prices} component={Prices} />
    <Route path={routes.prices.herbruger} component={HerbrugerPrice} />
    <Route path={routes.auth.create} component={Create} />
    <Route path={routes.auth.signIn} component={SignIn} />
    <Route path={routes.auth.validate} component={Validate} />
    <Route path={routes.audit.compare} component={Compare} />
  </Router>
);

export default App;
