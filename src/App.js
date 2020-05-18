import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { I18nextProvider } from "react-i18next";
import theme from "./common/config/theme";
import i18n from "./i18n";
import Routes from "./Routes";

import "./assets/font/AvenirNextLTPro/AvenirNextLTPro-Regular.otf";
import "./common/styles/global.css";
import "@brainhubeu/react-carousel/lib/style.css";

const App = () => (
  <I18nextProvider i18n={i18n} initialLanguage='en'>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </I18nextProvider>
);

export default App;
