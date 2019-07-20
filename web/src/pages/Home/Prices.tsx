import React, { useEffect } from "react";
import { Container, Typography, View } from "../../components";
import { google } from "../../config";

export const Prices = () => {
  useEffect(() => {
    google.injectApiScript({ onLoad: handleClientLoad });
  }, []);

  const handleClientLoad = () =>
    (window as any).gapi.load("client", async () => {
      try {
        await (window as any).gapi.client.init({
          ...google.sheets,
          // scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
        });
        (window as any).gapi.client.load("sheets", "v4", async () => {
          const res = await (window as any).gapi.client.sheets.spreadsheets.values.get({
            range: "Sheet1!A4:K",
            spreadsheetId: google.sheets.spreadsheetId,
          });
          console.log(res);
        });
      } catch (error) {
        console.error(error);
      }
    });

  return (
    <View minHeight="100vh" bgcolor="primary.main" id="premios">
      <Container maxWidth="xl">
        <View color="white">
          <Typography variant="h2" color="inherit">
            Los Premios
          </Typography>
        </View>
      </Container>
    </View>
  );
};
