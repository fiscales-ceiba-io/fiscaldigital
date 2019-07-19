import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import { Button, Link, View } from "../../components";
import { AppBar, Toolbar } from "../../components/AppBar";
import { theme } from "../../theme";
import { routes } from "../routes";

export const Header = () => (
  <View width="100%" position="absolute">
    <AppBar
      position="absolute"
      color="inherit"
      style={{ backgroundColor: theme.palette.secondary.main }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <View py={1}>
          <Link to={routes.root}>
            <img
              src="/svg/logo-fiscal-digital.svg"
              style={{ width: "180px", height: "auto" }}
              alt="fiscal digital logo"
            />
          </Link>
        </View>
        <Hidden smDown>
          <View>
            <Grid container spacing={1}>
              <Grid item style={gridItemStyles}>
                <Link to={`${routes.home.faqs}`}>FAQs</Link>
              </Grid>
              <Grid item style={gridItemStyles}>
                <a
                  href="https://github.com/fiscales-ceiba-io/fiscaldigital/"
                  target="_blank"
                  rel="nofollow"
                  style={linkStyles}
                >
                  GITHUB
                </a>
              </Grid>
              <Grid item>
                <Link to={routes.auth.create}>
                  <Button variant="outlined" color="primary" size="large">
                    Participa
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </View>
        </Hidden>
      </Toolbar>
    </AppBar>
  </View>
);

const linkStyles = {
  color: theme.palette.primary.main,
  textDecoration: "none",
};

const gridItemStyles = { display: "flex", alignItems: "center", marginRight: theme.spacing(2) };
