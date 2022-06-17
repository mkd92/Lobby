import axios from "axios";
import tokenService from "./tokenService";

const instance = axios.create({
  baseURL: "http://192.168.29.112:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken();
    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// instance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalConfig = err.config;
//     console.log(err.response.status);
//     if (err.response.status === 401 && originalConfig.url === "/properties/") {
//       originalConfig._retry = true;
//       try {
//         const rs = await instance.get("/auth/refresh_token/");
//         // console.log(rs);
//         const { access_token, expires } = rs.data;
//         tokenService.updateLocalAccessToken(access_token, expires);
//         return instance(originalConfig);
//       } catch (_error) {
//         return Promise.reject(_error);
//       }
//     }
//   }
// );
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Reject promise if usual error
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    /*
     * When response code is 401, try to refresh the token.
     * Eject the interceptor so it doesn't loop in case
     * token refresh causes the 401 response
     */
    instance.interceptors.response.eject(instance);

    return instance
      .get("/auth/refresh_token")
      .then((response) => {
        const { access_token, expires } = response.data;
        tokenService.updateLocalAccessToken(access_token, expires);
        // saveToken();
        error.response.config.headers["Authorization"] =
          "Bearer " + response.data.access_token;
        return axios(error.response.config);
      })
      .catch((error) => {
        // console.log(error);
        tokenService.destroyToken();
        // this.router.push("/login");
        return Promise.reject(error);
      });
  }
);

export default instance;
