import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./index.css";
import { store } from "./app/store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
