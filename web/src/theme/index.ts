import { createMuiTheme } from "@material-ui/core/styles";

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
      main: "#134f5c",
    },
    secondary: {
      light: "#fefefe",
      main: "#cfe2f3",
    },
  },
  typography: {
    subtitle2: {
      fontSize: "1.1rem",
    },
  },
});
