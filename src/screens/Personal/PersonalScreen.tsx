import React from 'react';
import CenterView from '@ui/CenterView';
import { Text, Button } from 'react-native-elements';
import { StackScreenComponent } from '@utils/types';

type PersonalScreenProps = {};
const PersonalScreen: StackScreenComponent<PersonalScreenProps> = ({}) => {
  return (
    <CenterView>
      <Text>PersonalScreen</Text>
      <Button title={'Click me'} />
    </CenterView>
  );
};

export default PersonalScreen;
