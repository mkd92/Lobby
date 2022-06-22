import React from "react";

import { CssBaseline } from "@mui/material";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ThemeProvider } from "@material-ui/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import { createTheme } from "@material-ui/core/styles";
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
