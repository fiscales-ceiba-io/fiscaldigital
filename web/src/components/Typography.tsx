import MUITypography from "@material-ui/core/Typography";
import { palette } from "@material-ui/system";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../theme";

export const Typography = styled(MUITypography)`
  ${palette}
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${theme.palette.primary.main};
`;
