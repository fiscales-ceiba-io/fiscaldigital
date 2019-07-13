import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { History } from "history";
import Cookies from "js-cookie";
import { get } from "lodash";
import React, { useState } from "react";
import { Button, closeSnackbar, Container, displaySnackbarError, Snackbar, SnackbarProps, TextField, View } from "../../components";
import { routes } from "../routes";
import { AuthLogo } from "./components";

export const Validate = ({ location, history }: { location: any; history: History }) => {
  const [token, setToken] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarProps>(closeSnackbar());
  const { telefono: phoneNumber } = location.state;

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.set("telefono", phoneNumber);
      formData.set("token", token);
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/usuarios/validar/`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      setSnackbar(closeSnackbar());

      Cookies.set("userID", res.data.id);
      Cookies.set("token", get(res, ["headers", "token"]) || get(res, ["headers", "Token"]));
      history.push(routes.audit.compare);
    } catch (error) {
      console.log(error);
      setSnackbar(displaySnackbarError(error));
    }
  };

  return (
    <View minHeight="100vh" justifyContent="center" flexDirection="column" display="flex">
      <Snackbar snackbar={snackbar} onClose={() => setSnackbar(closeSnackbar())} />
      <Container maxWidth="xs">
        <AuthLogo />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Ingresa el código de verificación que acabamos de enviarte al {phoneNumber}</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="token"
              label="Código de Verificación"
              name="token"
              value={token}
              autoFocus
              onChange={e => setToken(e.target.value)}
              autoComplete="token"
            />
          </Grid>
          <Grid item xs={12}>
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
        </Grid>
      </Container>
    </View>
  );
};
