import { Grid } from "@material-ui/core";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Anchor, Container, Typography, View } from "../../components";
import { theme } from "../../theme";

export const Intro = ({ signUpForm }: { signUpForm: any }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/resultados/avances/?format=json`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      minHeight="100vh"
      justifyContent="center"
      flexDirection="column"
      display="flex"
      bgcolor="secondary.main"
    >
      <Container maxWidth="xl" style={{ marginTop: 180, marginBottom: 98 }}>
        <Grid container>
          <Grid item lg={7} style={{ marginBottom: theme.spacing(3) }}>
            <Typography variant="h2" color="primary">
              Juntos contamos
            </Typography>
            <Typography variant="h2" color="primary" style={{ marginBottom: theme.spacing(2) }}>
              todos los votos
            </Typography>
            <Typography variant="h4" color="primary" style={{ marginBottom: theme.spacing(2) }}>
              Sé un{" "}
              <Anchor
                href="https://twitter.com/hashtag/Fiscal_Digital"
                target="_blank"
                rel="nofollow"
              >
                #Fiscal_Digital
              </Anchor>
              .
            </Typography>
            <Typography variant="h5" color="primary">
              Participa hoy mismo a favor de la democracia.
            </Typography>
          </Grid>
          <Grid item lg={4}>
            {signUpForm}
          </Grid>
        </Grid>
      </Container>
      <View mt="auto" bgcolor="primary.main" color="background.default" id="stats">
        <Container style={{ padding: 0 }} maxWidth="xl">
          <Grid container>
            <Stat size="lg" amount={get(stats, ["usuarios"], 0)} description="Usuarios" />
            <Stat
              size="lg"
              amount={get(stats, ["digitaciones", "validas"], 0)}
              description="Actas Digitadas"
            />
            <Stat size="lg" amount={0} description="Actas Validadas" />
          </Grid>
        </Container>
        <Container maxWidth="xl" style={{ padding: 0 }}>
          <Grid container>
            <Stat size="sm" amount={get(stats, ["avances", "p"], 0)} description="Presidente" />
            <Stat
              size="sm"
              amount={get(stats, ["avances", "l_n"], 0)}
              description="Listado Nacional"
            />
            <Stat
              size="sm"
              amount={get(stats, ["avances", "l_d"], 0)}
              description="Diputados Distritales"
            />
            <Stat
              size="sm"
              amount={get(stats, ["avances", "l_m"], 0)}
              description="Corporaciones Municipales"
            />
            <Stat size="sm" amount={get(stats, ["avances", "p_c"], 0)} description="PARLACEN" />
          </Grid>
        </Container>
      </View>
    </View>
  );
};

export const Stat = ({
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
        style={{
          padding: size === "sm" ? theme.spacing(3) : theme.spacing(4),
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(4),
        }}
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
