import { colors } from '@styles/Colors';
import { FC } from 'react';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Divider, Text } from 'react-native-elements';

const styles = StyleSheet.create({
  titleText: {
    color: colors.secondary
  },
  divider: {
    backgroundColor: colors.secondary
  }
});

type MediaDetailSectionProps = {
  containerStyle?: StyleProp<ViewStyle>;
  sectionTitle: string;
};
const MediaDetailSection: FC<MediaDetailSectionProps> = ({ containerStyle, sectionTitle, children }) => {
  return (
    <View style={ containerStyle }>
      <Text h4 h4Style={ styles.titleText }>{ sectionTitle }</Text>
      <Divider style={ styles.divider }/>
      { children }
    </View>
  );
};

MediaDetailSection.defaultProps = {
  containerStyle: {}
};

export default MediaDetailSection;
