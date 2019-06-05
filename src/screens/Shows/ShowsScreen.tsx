import React from 'react';
import CenterView from '@ui/CenterView';
import { Button, Text } from 'react-native-elements';
import { StackScreenComponent } from '@utils/types';

type ShowsScreenProps = {};
const ShowsScreen: StackScreenComponent<ShowsScreenProps> = ({}) => {
  return (
    <CenterView>
      <Text>ShowsScreen</Text>
      <Button title={'Click me'} />
    </CenterView>
  );
};

export default ShowsScreen;
