import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, View } from "../../components";
import { theme } from "../../theme";

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
      <Container
        maxWidth="xl"
        style={{
          marginBottom: theme.spacing(6),
        }}
      >
        <Grid container>
          <Grid item>
            <Typography variant="h2">Marcador</Typography>
            <Typography variant="h5">
              Mostrando los {leaderboard.length} usuarios con más actas validadas
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm">
        <Paper style={{ maxHeight: "50vh", overflow: "scroll" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Actas Validadas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((row: { nombre: string; actas_validadas: number }, i: number) => (
                <TableRow key={i}>
                  <TableCell style={{ textTransform: "capitalize" }}>{row.nombre}</TableCell>
                  <TableCell align="right">{row.actas_validadas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </View>
  );
};
