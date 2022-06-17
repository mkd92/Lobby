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

module.exports = { getLocalAccessToken, updateLocalAccessToken };
