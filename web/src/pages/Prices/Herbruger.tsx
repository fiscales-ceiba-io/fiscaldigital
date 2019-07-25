import React from "react";
import { Container, Grid, Typography, View } from "../../components";
import { theme } from "../../theme";
import { Footer, Header } from "../Home";

export const HerbrugerPrice = () => (
  <>
    <Header />
    <View
      minHeight="100vh"
      bgcolor="secondary.main"
      style={{
        paddingBottom: theme.spacing(6),
        paddingTop: (theme.mixins.toolbar.minHeight as number) * 2.3,
      }}
      id="price"
    >
      <Container maxWidth="xl">
        <Grid container style={{ marginBottom: theme.spacing(5) }}>
          <Grid item>
            <Typography variant="h2">Nivel Arturo Herbruger Astúrias</Typography>
          </Grid>
        </Grid>
      </Container>
    </View>
    <Footer />
  </>
);

const title = { textTransform: "uppercase" as "uppercase" };
const text = {};
