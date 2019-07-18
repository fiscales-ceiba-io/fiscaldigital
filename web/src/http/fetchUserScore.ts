import axios from "axios";
import Cookies from "js-cookie";

export const fetchUserScore = async (cb: any) => {
  console.log("fetching");
  try {
    const res = await axios({
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      },
      method: "get",
      url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/resultados/avances_usuario/`,
    });
    cb(res.data);
  } catch (error) {
    console.log(error);
  }
};
