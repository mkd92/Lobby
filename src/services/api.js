import axios from "axios";
import tokenService from "./tokenService";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});
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

// instance.interceptors.request.use(
//   (config) => {
//     if (config.url !== "/auth/signup" && config) {
//       console.log(config);
//     }
//     console.log("exp");
//     return config;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (originalConfig.url !== "/auth/signup" && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         try {
//           const rs = await instance.get("/auth/refresh_token");
//           const { access_token, expires } = rs.data;
//           tokenService.updateLocalAccessToken(access_token, expires);
//           return instance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }
//     return Promise.reject(err);
//   }
// );
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && originalConfig.url === "/properties/") {
      // originalConfig._retry = true;
      try {
        const rs = await instance.get("/auth/refresh_token");
        console.log(rs);
        // const { access_token, expires } = rs.data;
        // tokenService.updateLocalAccessToken(access_token, expires);
        // return instance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
);

export default instance;
