import { Theme, ThemeProvider } from 'react-native-elements';
import React, { FC, ReactChild } from 'react';
import { colors } from './Colors';

const theme: Theme = {
  Button: {
    raised: true,
    buttonStyle: {
      backgroundColor: colors.primary
    },
    titleStyle: {
      fontSize: 14
    }
  },
  Text: {
    style: {
      color: colors.secondary
    },
    h4Style: {
      color: colors.default,
      fontSize: 20,
      fontWeight: 'bold'
    }
  },
  Header: {
    containerStyle: {
      backgroundColor: colors.secondary
    }
  }
};

const Themed: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children as ReactChild}</ThemeProvider>;
};

export default Themed;
