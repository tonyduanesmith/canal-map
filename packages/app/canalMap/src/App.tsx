import React from "react";
import Main from "../../../pages/main";
import "./App.css";
import { ThemeProvider } from "styled-components";
import theme from "../../../utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
