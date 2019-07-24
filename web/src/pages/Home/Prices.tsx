import Glide from "@glidejs/glide";
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import { withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Container, Typography, View } from "../../components";
import { google } from "../../config";
import styles from "../../styles";
import { theme } from "../../theme";
import { Header } from "./Header";

export const Prices = withStyles(styles.prices)(({ classes }: { classes: any }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    google.injectApiScript({
      onLoad: google.handleClientLoad(
        {
          initConfig: {
            ...google.sheets,
          },
          sheetConfig: {
            range: "Types!A2:E",
            spreadsheetId: google.sheets.spreadsheetId,
          },
        },
        (res: any) => {
          setData(res.result.values);
          setLoading(false);
          new Glide(".glide", {
            focusAt: "center",
            peek: 120,
            perView: 2,
            rewind: true,
            breakpoints: {
              [theme.breakpoints.width("xs")]: {
                perView: 1,
              },
              [theme.breakpoints.width("sm")]: {
                perView: 1,
                peek: 0,
              },
            },
          }).mount();
        },
        (error: any) => {
          console.error(error);
        },
      ),
    });
  }, []);

  return (
    <>
      <Header />
      <View
        minHeight="100vh"
        bgcolor="primary.main"
        id="premios"
        style={{
          paddingTop: (theme.mixins.toolbar.minHeight as number) * 2.3,
        }}
      >
        <Container maxWidth="xl">
          <View color="white" pb={4} textAlign="center">
            <Typography variant="h2" color="inherit">
              Los Premios
            </Typography>
          </View>
          <View>
            {isLoading ? (
              <Container maxWidth="sm">
                <div className="glide">
                  <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                      <li className={`glide__slide ${classes.glideSlide}`}>
                        <View className={`slide ${classes.glideSlideView}`}>
                          <Typography gutterBottom variant="h4">
                            Cargando
                          </Typography>
                          <View width={35} height={7} bgcolor="white" mb={2} />
                        </View>
                      </li>
                    </ul>
                  </div>
                </div>
              </Container>
            ) : (
              <div className="glide">
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                    {data.map((price: any, i: number) => {
                      const [title, description, value, units, terms] = price;
                      if (title && description) {
                        return (
                          <li key={i} className={`glide__slide ${classes.glideSlide}`}>
                            <View
                              className={`slide ${classes.glideSlideView}`}
                              flexDirection="column"
                              display="flex"
                            >
                              <Typography gutterBottom variant="h4">
                                {title}
                              </Typography>
                              <View width={35} height={7} bgcolor="white" mb={2} />
                              <Typography gutterBottom variant="h6">
                                {description}
                              </Typography>
                              <View style={{ marginTop: "auto" }}>
                                <Typography variant="body1" gutterBottom>
                                  Premio con un valor de Q.{value}. Limitado a {units} unidades.
                                  <br />
                                  (Sujeto a términos y condiciones)
                                </Typography>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  style={{ marginTop: theme.spacing(2) }}
                                >
                                  Ver detalles
                                </Button>
                              </View>
                            </View>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
                <Container maxWidth="md">
                  <div
                    className="glide__arrows"
                    data-glide-el="controls"
                    style={{
                      minHeight: 98,
                      position: "relative",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      className="glide__arrow glide__arrow--right"
                      data-glide-dir=">"
                    >
                      Siguiente
                    </Button>
                  </div>
                </Container>
              </div>
            )}
          </View>
        </Container>
      </View>
    </>
  );
});
