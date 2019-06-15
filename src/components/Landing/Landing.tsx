import { LandingScreenProps } from '@screens/Landing/LandingScreen';
import { colors } from '@styles/Colors';
import CenterView from '@ui/CenterView';
import React, { FC, useEffect } from 'react';
import Spinner from 'react-native-spinkit';
import { Text } from 'react-native-elements';

const Landing: FC<LandingScreenProps> = ({ hasConfiguration, hasGenres, fetchConfiguration, fetchGenres, navigation }) => {
  useEffect(() => {
    if (!hasConfiguration && !hasGenres) {
      fetchConfiguration();
      fetchGenres();
    } else {
      navigation.navigate({ routeName: 'MainTab' });
    }
  }, [hasConfiguration, hasGenres]);

  return (
    <CenterView>
      <Spinner isVisible={ true }/>
      <Text style={ { fontSize: 12, color: colors.secondary } }>Loading...</Text>
    </CenterView>
  );
};

export default Landing;
