import axios from "axios";

export const fetchLeaderboard = async (cb: any) => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/resultados/high_scores/`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    cb(res.data);
  } catch (error) {
    console.log(error);
  }
};
