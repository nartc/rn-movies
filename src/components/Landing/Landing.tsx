import { LandingScreenProps } from '@screens/Landing/LandingScreen';
import CenterView from '@ui/CenterView';
import React, { FC, useEffect } from 'react';
import Spinner from 'react-native-spinkit';

const Landing: FC<LandingScreenProps> = ({ hasConfiguration, fetchConfiguration, navigation }) => {

  useEffect(() => {
    if (!hasConfiguration) {
      fetchConfiguration();
    } else {
      navigation.navigate({ routeName: 'App' });
    }
  }, [hasConfiguration]);

  return (
    <CenterView>
      <Spinner isVisible={ true }/>
    </CenterView>
  );
};

export default Landing;
