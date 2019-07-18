import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Link, Typography, View } from "../../components";
import { fetchLeaderboard } from "../../http";
import { theme } from "../../theme";
import { routes } from "../routes";

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard(setLeaderboard);
  }, []);

  return (
    <View minHeight="60vh" bgcolor="secondary.main" py={6}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item>
            <Typography variant="h2">Marcador</Typography>
            <Typography variant="h5">
              Mostrando los {leaderboard.length} usuarios con más actas digitadas
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
                    <TableCell align="right">Actas Digitadas</TableCell>
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
              display: "flex",
              minHeight: "50vh",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom style={{ textTransform: "uppercase" }}>
              ¿Cómo se genera un Acta Digitada?
            </Typography>
            <Typography variant="body1" style={{ marginBottom: theme.spacing(3) }}>
              Cada usuario genera una serie de valores en base a su digitación y se suben a su
              perfil personal en la base de datos de #Fiscal_Digital al momento de presionar
              “Continuar” al final de cada acta. Estos valores son registrados en la base de datos
              bajo cada usuario. Así calculamos la cantidad de Actas Digitadas.
            </Typography>
            <Link to={`${routes.home}#faqs`}>
              <Button variant="outlined" size="large" color="primary">
                Preguntas Frecuentes
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </View>
  );
};
