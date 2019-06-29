import { AccountMediaType } from '@api/Models';
import CenterView from '@ui/CenterView';
import { StackScreenComponent } from '@utils/types';
import React from 'react';
import { Text } from 'react-native-elements';

const PersonalList: StackScreenComponent<{}, { title: string, type: AccountMediaType }> = ({ navigation }) => {
  const mediaType = navigation.getParam('type');

  return (
    <CenterView>
      <Text>Personal List</Text>
    </CenterView>
  );
};

PersonalList.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'List')
});

export default PersonalList;
