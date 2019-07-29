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
  ReCAPTCHA,
  Snackbar,
  SnackbarProps,
  TextField,
  Typography,
  View,
} from "../../components";
import { theme } from "../../theme";
import { Footer } from "../Home";
import { routes } from "../routes";
import { AuthLogo } from "./components";

export const Create = ({ history }: { history: History }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps>(closeSnackbar());

  useEffect(() => {
    if (Cookies.get("token") && Cookies.get("userID")) {
      history.push(routes.audit.compare);
    }
  }, [history]);

  return (
    <>
      <View minHeight="100vh" justifyContent="center" flexDirection="column" display="flex">
        <Snackbar snackbar={snackbar} onClose={() => setSnackbar(closeSnackbar())} />
        <Container maxWidth="xs">
          <AuthLogo />
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
        </Container>
      </View>
      <Footer />
    </>
  );
};

export const SignUpForm = ({ onSuccess, onError }: { onSuccess: any; onError: any }) => {
  const [nombre, setFName] = useState("");
  const [apellido, setLName] = useState("");
  const [telefono, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+502");
  const [reCaptchaToken, setReCaptchaToken] = useState(null);

  const handleReCaptchaOnChange = (token: string | null) => {
    console.log(token);
    setReCaptchaToken(token);
  };

  const handleReCaptchaOnError = () => {
    console.log("errored");
    onError({ message: `Hubo un error con ReCAPTCHA. Intenta de nuevo.` });
  };

  const onSubmit = async () => {
    if (!reCaptchaToken) {
      onError(`Debes completar todos los datos. Incluyendo ReCAPTCHA.`);
      return;
    }

    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/usuarios/crear/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          apellido,
          nombre,
          telefono: `${countryCode}${telefono.trim()}`,
          "g-recaptcha-response": reCaptchaToken,
        },
      });

      onSuccess({ telefono: `${countryCode}${telefono.trim()}` });
    } catch (error) {
      console.log(error);
      onError(error);
    }
  };

  const marginBottom = theme.spacing(1);

  return (
    <>
      <Grid container spacing={2} style={{ marginBottom }}>
        <Grid item xs={12} sm={6} lg={6}>
          <TextField
            autoComplete="fname"
            name="nombre"
            variant="outlined"
            required
            fullWidth
            id="nombre"
            label="Nombre"
            value={nombre}
            onChange={e => setFName(e.target.value)}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="apellido"
            label="Apellido"
            name="apellido"
            value={apellido}
            onChange={e => setLName(e.target.value)}
            autoComplete="lname"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom }}>
        <Grid item xs={4} lg={4}>
          <CountryCodeSelect onChange={(e: any) => setCountryCode(e.target.value)} />
        </Grid>
        <Grid item xs={8} lg={8}>
          <PhoneNumberInput
            autoFocus={false}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom }} justify="center">
        <Grid item>
          <ReCAPTCHA onChange={handleReCaptchaOnChange} onErrored={handleReCaptchaOnError} />
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom }}>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={onSubmit}
            disabled={!reCaptchaToken}
          >
            Crear Cuenta
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link to={routes.auth.signIn}>
            <Typography variant="body2" align="center">
              Ya tengo una cuenta
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
