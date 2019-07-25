import { createMuiTheme } from "@material-ui/core/styles";
import { lighten } from "polished";

export const spacingUnit = 16;

export const theme = createMuiTheme({
  spacing: 8,
  palette: {
    action: {
      active: "#434343",
    },
    background: {
      default: "#fff",
    },
    primary: {
      dark: "#434343",
      main: "#134F5C",
    },
    secondary: {
      contrastText: lighten(0.02, "#cfe2f3"),
      light: lighten(0.05, "#cfe2f3"),
      main: "#cfe2f3",
    },
  },
  typography: {
    subtitle2: {
      fontSize: "1.1rem",
    },
  },
});
