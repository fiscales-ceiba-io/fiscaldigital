import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Compare, Create, Home, routes, SignIn, Validate } from "./pages";
import { FAQs, Price, Prices } from "./pages/Home";

const App: React.FC = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path={routes.home.faqs} component={FAQs} />
    <Route path={routes.home.prices} component={Prices} />
    <Route
      path={routes.prices.herbruger}
      render={(props: any) => (
        <Price
          {...props}
          priceType="nivel Arturo Herbruger Astúrias"
          nextPriceRoute={`/premio/nivel-civico`}
          priceTitle="Nivel Arturo Herbruger Astúrias"
        />
      )}
    />
    <Route
      path={routes.prices.socratico}
      render={(props: any) => (
        <Price
          {...props}
          priceType="nivel socrático"
          nextPriceRoute={`/premio/nivel-arturo-herbruger-asturias`}
          priceTitle="Nivel Socrático"
        />
      )}
    />
    <Route
      path={routes.prices.platonico}
      render={(props: any) => (
        <Price
          {...props}
          priceType="nivel platónico"
          nextPriceRoute={`/premio/nivel-socratico`}
          priceTitle="Nivel Platónico"
        />
      )}
    />
    <Route
      path={routes.prices.civico}
      render={(props: any) => (
        <Price
          {...props}
          priceType="nivel cívico"
          nextPriceRoute={`/premio/nivel-platonico`}
          priceTitle="Nivel Cívico"
        />
      )}
    />
    <Route path={routes.auth.create} component={Create} />
    <Route path={routes.auth.signIn} component={SignIn} />
    <Route path={routes.auth.validate} component={Validate} />
    <Route path={routes.audit.compare} component={Compare} />
  </Router>
);

export default App;
