const test = () => {
  let val = window.localStorage.getItem("userData");
  let data = JSON.parse(val);
  console.log(data.state.userData);
};
export default test;
