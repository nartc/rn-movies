import { JSXElement } from '@babel/types';
import { colors } from '@styles/Colors';
import { dimensions } from '@styles/Dimensions';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

const styles = StyleSheet.create({
  infoSectionWrapper: {
    width: dimensions.width,
    paddingHorizontal: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

type MediaDetailInfoProps = {
  infoTitle: string;
  infoText?: string;
  infoComponent?: ReactNode;
};
const MediaDetailInfo: FC<MediaDetailInfoProps> = ({ infoTitle, infoComponent, infoText }) => {
  return (
    <View style={ styles.infoSectionWrapper }>
      <Text>{ infoTitle }: </Text>
      { infoText ? <Text>{ infoText }</Text> : infoComponent }
    </View>
  );
};

export default MediaDetailInfo;
