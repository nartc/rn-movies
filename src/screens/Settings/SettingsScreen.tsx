import React from 'react';
import { StackScreenComponent } from '@utils/types';
import CenterView from '@ui/CenterView';
import { Text } from 'react-native-elements';

type SettingsScreenProps = {};
const SettingsScreen: StackScreenComponent<SettingsScreenProps> = ({}) => {
  return (
    <CenterView>
      <Text>SettingsScreen</Text>
    </CenterView>
  );
};

export default SettingsScreen;
