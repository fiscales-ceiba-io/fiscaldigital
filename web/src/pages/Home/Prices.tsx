import Glide from "@glidejs/glide";
import "@glidejs/glide/src/assets/sass/glide.core.scss";
// import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import { withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Container, Typography, View } from "../../components";
import { google } from "../../config";
import styles from "../../styles";
import { theme } from "../../theme";

export const Prices = withStyles(styles.prices)(({ classes }: { classes: any }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    google.injectApiScript({ onLoad: handleClientLoad });
  }, []);

  const handleClientLoad = () =>
    (window as any).gapi.load("client", async () => {
      try {
        await (window as any).gapi.client.init({
          ...google.sheets,
        });
        (window as any).gapi.client.load("sheets", "v4", async () => {
          const res = await (window as any).gapi.client.sheets.spreadsheets.values.get({
            range: "Sheet1!A5:Q",
            spreadsheetId: google.sheets.spreadsheetId,
          });
          setData(res.result.values);
          new Glide(".glide", {
            focusAt: "center",
            peek: 120,
            perView: 3,
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
        });
      } catch (error) {
        console.error(error);
      }
    });

  return (
    <View minHeight="100vh" bgcolor="primary.main" id="premios">
      <Container maxWidth="xl">
        <View color="white" pt={6} pb={4} textAlign="center">
          <Typography variant="h2" color="inherit">
            Los Premios
          </Typography>
        </View>
        <View>
          <div className="glide">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {data.map((price: any, i: number) => {
                  const [terms, , , , description, title, imgsrc] = price;
                  if (title && description) {
                    return (
                      <li key={i} className={`glide__slide ${classes.glideSlide}`}>
                        <View className={`slide ${classes.glideSlideView}`}>
                          <Typography gutterBottom variant="h4">{title}</Typography>
                          <View width={35} height={7} bgcolor="white" mb={2}></View>
                          <Typography gutterBottom variant="h5">{description}</Typography>
                          <Typography variant="body1">{terms}</Typography>
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
                  variant="outlined"
                  size="large"
                  color="secondary"
                  className="glide__arrow glide__arrow--right"
                  data-glide-dir=">"
                >
                  Siguiente
                </Button>
              </div>
              <View color="white" textAlign="center" pb={4}>
                <Typography variant="body2" color="inherit">
                  Términos y Condiciones: anunciaremos ganadores el 20 de agosto del 2019 y podrán
                  pasar a recoger su premio a partir del 25 de agosto en la sede de HCG y FUCUDE (12
                  Avenida, 13-36, Zona 11, Colonia Mariscal) entre las 10am y 4pm en días hábiles.
                  Anunciamos ganadores en esta fecha para permitirle a #Fiscal_Digital determinar el
                  porcentaje de confiabilidad de cada usuario producto del número de Actas Validadas
                  dividido el número de Actas Digitadas. Para poder ganar, deber tener un mínimo de
                  70% de confiabilidad en tu digitación, así que digita a conciencia todas las actas
                  que puedas para incrementar tus posibilidades de ganar.
                </Typography>
              </View>
            </Container>
          </div>
        </View>
      </Container>
    </View>
  );
});
