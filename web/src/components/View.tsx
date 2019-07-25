import Box from "@material-ui/core/Box";
import MUIContainer from "@material-ui/core/Container";
import { flexbox, palette, spacing } from "@material-ui/system";
import React from "react";
import styled from "styled-components";

export const View = styled(Box)`
  ${palette}
  ${spacing}
  ${flexbox}
`;

export const Container = styled(MUIContainer)`
  ${spacing}
`;

export const Separator = ({ bgColor = "white" }: { bgColor?: string }) => (
  <View width={35} height={7} bgcolor={bgColor} mb={2} />
);
