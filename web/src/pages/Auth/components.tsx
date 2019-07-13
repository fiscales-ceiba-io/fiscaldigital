import React from "react";
import { View } from "../../components";

export const AuthLogo = () => (
  <View mb={6} justifyContent="center" display="flex" flexDirection="row">
    <img
      src="/svg/logo-fiscal-digital.svg"
      style={{ width: "280px", height: "auto" }}
      alt="fiscal digital logo"
    />
  </View>
);
