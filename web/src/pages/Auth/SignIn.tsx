import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { History } from "history";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  closeSnackbar,
  Container,
  CountryCodeSelect,
  displaySnackbarError,
  PhoneNumberInput,
  Snackbar,
  SnackbarProps,
  Typography,
  View,
} from "../../components";
import { theme } from "../../theme";
import { Footer } from "../Home";
import { routes } from "../routes";
import { AuthLogo } from "./components";

export const SignIn = ({ history }: { history: History }) => {
  const [telefono, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+502");
  const [snackbar, setSnackbar] = useState<SnackbarProps>(closeSnackbar());

  useEffect(() => {
    if (Cookies.get("token") && Cookies.get("userID")) {
      history.push(routes.audit.compare);
    }
  }, [history]);

  const onSubmit = async () => {
    try {
      const create = await axios({
        method: "post",
        url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/usuarios/token/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          telefono: `${countryCode}${telefono.trim()}`,
        },
      });

      Cookies.set("userID", create.data.id);

      setSnackbar(closeSnackbar());

      history.push(routes.auth.validate, {
        telefono: `${countryCode}${telefono.trim()}`,
      });
    } catch (error) {
      console.log(error.response.data);
      setSnackbar(displaySnackbarError(error));
    }
  };

  const marginBottom = theme.spacing(1);

  return (
    <>
      <View minHeight="100vh" justifyContent="center" flexDirection="column" display="flex">
        <Snackbar snackbar={snackbar} onClose={() => setSnackbar(closeSnackbar())} />
        <Container maxWidth="xs">
          <AuthLogo />
          <Grid container spacing={2} style={{ marginBottom }}>
            <Grid item lg={4}>
              <CountryCodeSelect onChange={(e: any) => setCountryCode(e.target.value)} />
            </Grid>
            <Grid item lg={8}>
              <PhoneNumberInput
                autoFocus={true}
                onChange={(e: any) => setPhoneNumber(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={onSubmit}
              >
                Enviar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to={routes.auth.create}>
                <Typography variant="body2" align="center">
                  Crear una cuenta
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </View>
      <Footer />
    </>
  );
};
