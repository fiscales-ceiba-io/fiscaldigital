import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { Typography, View } from "../../components";
import { theme } from "../../theme";

export const Score = ({
  fetchUserScore,
  fetchLeaderboard,
}: {
  fetchUserScore?: any;
  fetchLeaderboard?: any;
}) => {
  const [score, setScore] = useState({});
  const [leaderboard, setLeaderboard] = useState([{}]);

  useEffect(() => {
    if (fetchUserScore) {
      fetchUserScore(setScore);
    }
    if (fetchLeaderboard) {
      fetchLeaderboard(setLeaderboard);
    }
  }, [fetchUserScore, fetchLeaderboard]);

  return (
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
      <Typography variant="body1">
        Tus actas digitadas: {get(score, ["actas_totales"], 0)}
      </Typography>
      <Typography variant="body1">
        Actas digitadas del 1er lugar: {get(leaderboard[0], ["actas_validadas"], 0)}
      </Typography>
    </View>
  );
};
