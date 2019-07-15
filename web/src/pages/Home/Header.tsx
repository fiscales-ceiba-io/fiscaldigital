import { Grid, Hidden } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Button, View } from "../../components";
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
        <View>
          <img
            src="/svg/logo-fiscal-digital.svg"
            style={{ width: "180px", height: "auto" }}
            alt="fiscal digital logo"
          />
        </View>
        <Hidden smDown>
          <View>
            <Grid container spacing={1}>
              <Grid item>
                <a href="https://github.com/fiscales-ceiba-io/fiscaldigital/" target="_blank">
                  <Button variant="text" color="primary" size="large">
                    GitHub
                  </Button>
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
