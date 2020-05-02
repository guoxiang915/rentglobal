import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = (theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SplashScreen = () => {
  return (
    <div class="load-wrapper">
      <img class="loader-image" src="/SplashScreen.png" alt={"RENTGLOBAL"}/>
      <div class="app-version">Version 1.0</div>
    </div>
  );
};

export default withStyles(styleSheet)(SplashScreen);
