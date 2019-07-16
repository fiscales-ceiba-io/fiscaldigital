import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Link, Typography, View } from "../../components";
import { theme } from "../../theme";
import { routes } from "../routes";

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/resultados/high_scores/`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLeaderboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View minHeight="100vh" bgcolor="secondary.main" py={6}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item>
            <Typography variant="h2">Marcador</Typography>
            <Typography variant="h5">
              Mostrando los {leaderboard.length} usuarios con más actas validadas
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between" style={{ marginTop: theme.spacing(5) }}>
          <Grid item lg={4}>
            <Paper style={{ maxHeight: "50vh", overflow: "scroll" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Actas Validadas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map(
                    (row: { nombre: string; actas_validadas: number }, i: number) => (
                      <TableRow key={i}>
                        <TableCell style={{ textTransform: "capitalize" }}>{row.nombre}</TableCell>
                        <TableCell align="right">{row.actas_validadas}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid
            item
            lg={7}
            style={{
              minHeight: "50vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom style={{ textTransform: "uppercase" }}>
              ¿Cómo se genera un Acta Validada?
            </Typography>
            <Typography variant="body1" style={{ marginBottom: theme.spacing(3) }}>
              A cada Acta Digitada se le aplica una función criptográfica “hash”, generando una
              firma alfanumérica específica que es única para esa digitación. El sistema
              constantemente revisa si hay coincidencias exactas entre un Acta Digitada de un
              usuario y otro. Cuando el sistema reconoce que hay 4 Actas Digitadas con firmas
              electrónicas idénticas, se califican las actas como Actas Validadas y se agregan estos
              a los totales específicos de esta elección. Además, las Actas Validadas se dejan de
              entregar a usuarios para que no se digiten nuevamente aquellas que ya cuentan con una
              digitación validada. Si llegáramos a lograr un número alto de usuarios,
              incrementaremos el número de coincidencias exactas requeridas para considerar un Acta
              Validada. Nuestro tope máximo será 10 coincidencias exactas.
            </Typography>
            <Link to={`${routes.home}#faqs`}>
              <Button variant="outlined" size="large">
                Preguntas Frecuentes
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </View>
  );
};
