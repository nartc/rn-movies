import CenterView from '@ui/CenterView';
import { StackScreenComponent } from '@utils/types';
import React from 'react';
import { Button, Text } from 'react-native-elements';

const Personal: StackScreenComponent = () => {
  return (
    <CenterView>
      <Text>PersonalScreen</Text>
      <Button title={ 'Click me' }/>
    </CenterView>
  );
};

export default Personal;
