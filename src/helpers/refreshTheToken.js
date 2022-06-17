import axios from "axios";

const refreshTheToken = () => {
  axios.get("http://127.0.0.1:5000/auth/refresh_token/").then((res) => {
    return res.data;
  });
};

export default refreshTheToken;
