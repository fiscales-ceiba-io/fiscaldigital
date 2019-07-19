import React from "react";
import { Link, View } from "../../components";
import { routes } from "../routes";

export const AuthLogo = () => (
  <View mb={6} justifyContent="center" display="flex" flexDirection="row">
    <Link to={routes.root}>
      <img
        src="/svg/logo-fiscal-digital.svg"
        style={{ width: "280px", height: "auto" }}
        alt="fiscal digital logo"
      />
    </Link>
  </View>
);
