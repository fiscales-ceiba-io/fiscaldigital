import MUIAppBar from "@material-ui/core/AppBar";
import MUIToolbar from "@material-ui/core/Toolbar";
import { palette } from "@material-ui/system";
import styled from "styled-components";

export const AppBar = styled(MUIAppBar)`
  ${palette}
  background-color: "#fff";
`;

export const Toolbar = styled(MUIToolbar)`
  ${palette}
`;
