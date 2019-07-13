import { Grid } from "@material-ui/core";
import { History } from "history";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  closeSnackbar,
  Container,
  displaySnackbarError,
  Snackbar,
  SnackbarProps,
  Typography,
  View,
} from "../components";
import { AppBar, Toolbar } from "../components/AppBar";
import { theme } from "../theme";
import { SignUpForm } from "./Auth/Create";
import { routes } from "./routes";

export const Home = ({ history }: { history: History }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps>(closeSnackbar());

  return (
    <>
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
                    <Button variant="contained" color="primary" size="large">
                      Participa
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </View>
          </Toolbar>
        </AppBar>
      </View>
      <View
        minHeight="100vh"
        justifyContent="center"
        flexDirection="column"
        display="flex"
        bgcolor="secondary.main"
      >
        <Snackbar snackbar={snackbar} onClose={() => setSnackbar(closeSnackbar())} />
        <Container maxWidth="xl" style={{ marginTop: "auto" }}>
          <Grid container>
            <Grid item lg={7}>
              <Typography variant="h2" color="primary">
                Juntos contamos
              </Typography>
              <Typography variant="h2" color="primary" style={{ marginBottom: theme.spacing(2) }}>
                todos los votos
              </Typography>
              <Typography variant="h4" color="primary">
                Sé un #FiscalDigital.
              </Typography>
              <Typography variant="h5" color="primary">
                Participa hoy mismo a favor de la democracia.
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <SignUpForm
                onSuccess={({ telefono }: { telefono: string }) => {
                  setSnackbar(closeSnackbar());
                  history.push(routes.auth.validate, {
                    telefono,
                  });
                }}
                onError={(error: any) => {
                  setSnackbar(displaySnackbarError(error));
                }}
              />
            </Grid>
          </Grid>
        </Container>
        <View mt="auto" bgcolor="primary.main" color="background.default" id="stats">
          <Container style={{ padding: 0 }} maxWidth="xl">
            <Grid container>
              <Stat size="lg" amount={79} description="Usuarios Activos" />
              <Stat size="lg" amount={341} description="Digitaciones Válidas" />
              <Stat size="lg" amount={420} description="Digitaciones Totales" />
            </Grid>
          </Container>
          <Container maxWidth="xl" style={{ padding: 0 }}>
            <Grid container>
              <Stat size="sm" amount={123} description="Actas Presidenciales" />
              <Stat size="sm" amount={123} description="Listado Nacional" />
              <Stat size="sm" amount={123} description="Diputados Distritales" />
              <Stat size="sm" amount={123} description="Corporaciones Municipales" />
              <Stat size="sm" amount={123} description="Parlacen" />
            </Grid>
          </Container>
        </View>
      </View>
    </>
  );
};

const Stat = ({
  amount,
  description,
  size,
}: {
  amount: number;
  description: string;
  size: "sm" | "lg";
}) => {
  const wrapper = useRef(null);

  const handleOnMouseOver = () => {
    (wrapper.current as HTMLElement).style.backgroundColor = theme.palette.primary.light;
  };

  const handleOnMouseLeave = () => {
    (wrapper.current as HTMLElement).style.backgroundColor = theme.palette.primary.main;
  };

  return (
    <Grid item xs={12} lg="auto">
      <div
        ref={wrapper}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
        style={{ padding: size === "sm" ? theme.spacing(3) : theme.spacing(4) }}
      >
        <Typography variant={size === "sm" ? "h4" : "h2"} className="text">
          {amount}
        </Typography>
        <Typography variant={size === "sm" ? "h6" : "h5"} className="text">
          {description}
        </Typography>
      </div>
    </Grid>
  );
};
