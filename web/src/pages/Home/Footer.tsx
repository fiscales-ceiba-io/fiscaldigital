import { Grid } from "@material-ui/core";
import React from "react";
import { Anchor, Container, Link, Typography, View } from "../../components";
import { routes } from "../routes";

export const Footer = () => {
  return (
    <View bgcolor="primary.main">
      <Container maxWidth="md">
        <Grid container justify="space-between">
          <Grid item lg={4}>
            <View display="flex" flexDirection="column" minHeight="20vh" justifyContent="center">
              <Link to={routes.root}>
                <img
                  src="/svg/icon-fiscal-digital-white.svg"
                  style={{ width: "98px", height: "auto" }}
                  alt="fiscal digital icon"
                />
              </Link>
            </View>
          </Grid>
          <Grid item lg={4} style={{ textAlign: "right" }}>
            <View
              display="flex"
              width="100%"
              flexDirection="column"
              minHeight="20vh"
              justifyContent="center"
            >
              <Anchor
                href="https://www.youtube.com/channel/UC3MIBuSbfDn4f0K-KZtQc3w"
                target="_blank"
                rel="nofollow"
                style={{ color: "#fff", display: "block" }}
              >
                <Typography variant="h6" color="inherit">
                  YouTube
                </Typography>
              </Anchor>
              <Anchor
                href="https://twitter.com/Fiscal_Digital?s=09"
                target="_blank"
                rel="nofollow"
                style={{ color: "#fff", display: "block" }}
              >
                <Typography variant="h6" color="inherit">
                  Twitter
                </Typography>
              </Anchor>
              <Anchor
                href="https://www.facebook.com/pages/category/Cause/Fiscal_Digital-363450394369482/"
                target="_blank"
                rel="nofollow"
                style={{ color: "#fff", display: "block" }}
              >
                <Typography variant="h6" color="inherit">
                  Facebook
                </Typography>
              </Anchor>
              <Anchor
                href="mailto:fiscal_digital@ceiba.io"
                target="_blank"
                rel="nofollow"
                style={{ color: "#fff", display: "block" }}
              >
                <Typography variant="h6" color="inherit">
                  Email
                </Typography>
              </Anchor>
            </View>
          </Grid>
        </Grid>
      </Container>
    </View>
  );
};
