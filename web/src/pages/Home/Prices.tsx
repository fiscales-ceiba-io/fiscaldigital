import Glide from "@glidejs/glide";
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import React, { useEffect, useState } from "react";
import { Container, Typography, View } from "../../components";
import { google } from "../../config";

export const Prices = () => {
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
            range: "Sheet1!A5:K",
            spreadsheetId: google.sheets.spreadsheetId,
          });
          console.log(res);
          setData(res.result.values);
          new Glide(".glide").mount();
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
        <View>
          <div className="glide">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {data.map((price: any, i: number) => {
                  const [description] = price;
                  return (
                    <li key={i} className="glide__slide">
                      {description}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
              <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                prev
              </button>
              <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                next
              </button>
            </div>
          </div>
        </View>
      </Container>
    </View>
  );
};
