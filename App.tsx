import React, { FC } from 'react';
import { useScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';
import AppNavigator from '@navigation/AppNavigator';
import Themed from '@styles/Themed';
import configureStore from '@store/configureStore';
import { Provider } from 'react-redux';

useScreens();

const store = configureStore();

const App: FC = () => {
  return (
    <Provider store={ store }>
      <Themed>
        <StatusBar barStyle={ 'light-content' }/>
        <AppNavigator/>
      </Themed>
    </Provider>
  );
};

export default App;
