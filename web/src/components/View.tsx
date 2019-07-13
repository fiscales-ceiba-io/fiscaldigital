import Box from "@material-ui/core/Box";
import MUIContainer from "@material-ui/core/Container";
import { flexbox, palette, spacing } from "@material-ui/system";
import styled from "styled-components";

export const View = styled(Box)`
  ${palette}
  ${spacing}
  ${flexbox}
`;

export const Container = styled(MUIContainer)`
  ${spacing}
`;
