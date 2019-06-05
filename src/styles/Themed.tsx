import { Theme, ThemeProvider } from 'react-native-elements';
import React, { FC, ReactChild } from 'react';

const theme: Theme = {
  Button: {
    raised: true,
    buttonStyle: {
      backgroundColor: '#f00'
    },
    titleStyle: {
      fontSize: 14
    }
  },
  Text: {
    style: {
      color: '#fff'
    }
  }
};

const Themed: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children as ReactChild}</ThemeProvider>;
};

export default Themed;
