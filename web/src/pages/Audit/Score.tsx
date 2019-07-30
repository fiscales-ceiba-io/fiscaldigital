import { get } from "lodash";
import React from "react";
import { Typography, View } from "../../components";
import { theme } from "../../theme";

export const Score = ({ score, leaderboard }: { score: any; leaderboard: any }) => (
  <View
    bgcolor="#fff"
    style={{
      padding: theme.spacing(2),
      width: "100%",
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
    }}
  >
    <Typography variant="h6">Tu marcador</Typography>
    <Typography variant="body1">Tus actas digitadas: {get(score, ["actas_totales"], 0)}</Typography>
  </View>
);
