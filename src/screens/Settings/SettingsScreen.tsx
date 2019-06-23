import { clearStorage } from '@api/Storage';
import React from 'react';
import { StackScreenComponent } from '@utils/types';
import CenterView from '@ui/CenterView';
import { Button, Text } from 'react-native-elements';

type SettingsScreenProps = {};
const SettingsScreen: StackScreenComponent<SettingsScreenProps> = ({}) => {
  return (
    <CenterView>
      <Text>SettingsScreen</Text>
      <Button title={ 'Clear Storage' } onPress={ clearStorage }/>
    </CenterView>
  );
};

export default SettingsScreen;
