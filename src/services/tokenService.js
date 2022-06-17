const getLocalAccessToken = () => {
  let val = window.localStorage.getItem("userData");
  let data = JSON.parse(val);
  return data.state.userData.token;
};

const updateLocalAccessToken = (token, exp) => {
  const val = window.localStorage.getItem("userData");
  const data = {
    ...JSON.parse(val).state.userData,
    token: "Bearer " + token,
    exp,
  };
  window.localStorage.setItem("userData", JSON.stringify(data));
};
const destroyToken = () => {
  document.cookie =
    // eslint-disable-next-line no-useless-concat
    "refresh_token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.localStorage.clear();
};

module.exports = { getLocalAccessToken, updateLocalAccessToken, destroyToken };
