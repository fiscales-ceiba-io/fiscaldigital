import { Paper, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Container, Grid, Separator, Typography, View } from "../../components";
import { google } from "../../config";
import styles from "../../styles";
import { theme } from "../../theme";
import { Footer, Header } from "../Home";

export const HerbrugerPrice = withStyles(styles.prices)(({ classes }: { classes: any }) => {
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
            range: "Premios!A2:J",
            spreadsheetId: google.sheets.spreadsheetId,
          },
        },
        (res: any) => {
          setData(
            res.result.values.filter((row: any[]) => {
              const [level] = row;
              if (level === "nivel Arturo Herbruger Astúrias") {
                return row;
              }
            }),
          );
          setLoading(false);
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
        bgcolor="secondary.main"
        style={{
          paddingTop: (theme.mixins.toolbar.minHeight as number) * 2.3,
        }}
        id="price"
      >
        <Container maxWidth="xl">
          <Grid container style={{ marginBottom: theme.spacing(5) }}>
            <Grid item>
              <Typography gutterBottom variant="h2">
                Nivel Arturo Herbruger Astúrias
              </Typography>
              <Separator bgColor="primary.main" />
            </Grid>
          </Grid>
        </Container>
        {isLoading ? (
          <Container maxWidth="xl">
            <Typography gutterBottom variant="h4">
              Cargando
            </Typography>
          </Container>
        ) : (
          <>
            {data.map((price: any, i: number) => {
              const [level, title, description, imgsrc, logo, donor, value, units] = price;
              return (
                <div key={i}>
                  {i % 2 === 0 ? (
                    <View bgcolor="secondary.light">
                      <Container maxWidth="xl">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            lg={7}
                            xs={12}
                            style={{
                              paddingBottom: theme.spacing(5),
                              paddingTop: theme.spacing(5),
                            }}
                          >
                            <PriceDescriptionContainer
                              title={title}
                              description={description}
                              logo={logo}
                              donor={donor}
                              value={value}
                              units={units}
                            />
                          </Grid>
                          <Grid
                            item
                            lg={5}
                            xs={12}
                            style={{
                              paddingBottom: theme.spacing(5),
                              paddingTop: theme.spacing(5),
                            }}
                          >
                            <PriceImageContainer imgsrc={imgsrc} />
                          </Grid>
                        </Grid>
                      </Container>
                    </View>
                  ) : (
                    <View bgcolor="secondary.contrastText">
                      <Container maxWidth="xl">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            lg={5}
                            xs={12}
                            style={{
                              paddingBottom: theme.spacing(5),
                              paddingTop: theme.spacing(5),
                            }}
                          >
                            <PriceImageContainer imgsrc={imgsrc} />
                          </Grid>
                          <Grid
                            item
                            lg={7}
                            xs={12}
                            style={{
                              paddingBottom: theme.spacing(5),
                              paddingTop: theme.spacing(5),
                            }}
                          >
                            <PriceDescriptionContainer
                              title={title}
                              description={description}
                              logo={logo}
                              donor={donor}
                              value={value}
                              units={units}
                            />
                          </Grid>
                        </Grid>
                      </Container>
                    </View>
                  )}
                </div>
              );
            })}
          </>
        )}
      </View>
      <Footer />
    </>
  );
});

export const PriceDescriptionContainer = withStyles(styles.prices)(
  ({
    classes,
    title,
    description,
    logo,
    donor,
    value,
    units,
  }: {
    classes: any;
    title: string;
    description: string;
    logo: string;
    donor: string;
    value: string;
    units: string;
  }) => (
    <View display="flex" flexDirection="column" justifyContent="space-between" minHeight="50vh">
      <Typography gutterBottom variant="h4">
        {title}
      </Typography>
      <Typography gutterBottom variant="h5" style={{ marginBottom: theme.spacing(2) }}>
        {description}
      </Typography>
      <View mt="auto">
        <Typography variant="body1" gutterBottom>
          Patrocinado por {donor}:
        </Typography>
        <Paper
          className={`${classes.priceDescriptionLogo}`}
          style={{
            backgroundImage: `url(https://ipfs.globalupload.io/${logo})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            height: 98,
            marginBottom: theme.spacing(2),
          }}
        />
        <Typography variant="caption">
          Premio con un valor de Q.{value}. Limitado a {units} unidades.
          <br />
          (Sujeto a términos y condiciones)
        </Typography>
      </View>
    </View>
  ),
);

export const PriceImageContainer = withStyles(styles.prices)(
  ({ classes, imgsrc }: { classes: any; imgsrc: string }) => (
    <View display="flex" flexDirection="column" justifyContent="center" minHeight="50vh">
      <Paper
        className={`${classes.imageDescriptionSrc}`}
        style={{
          backgroundImage: `url(https://ipfs.globalupload.io/${imgsrc})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
        }}
      />
    </View>
  ),
);
