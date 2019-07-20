import { createStyles } from "@material-ui/core";
import { darken } from "polished";
import { theme } from "../../theme";

export default createStyles({
  glideSlide: {
    opacity: 0.5,
    // width: "100%",
    "&.glide__slide--active": {
      opacity: 1,
      "& .slide": {
        backgroundColor: theme.palette.primary.main,
        border: `3px solid ${darken(0.05, theme.palette.primary.main)}`,
      },
    },
  },
  glideSlideView: {
    // width: "100%",
    backgroundColor: darken(0.05, theme.palette.primary.main),
    color: "white",
    minHeight: "50vh",
    padding: theme.spacing(3),
  },
});
