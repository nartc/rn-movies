import { colors } from '@styles/Colors';
import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge, Text } from 'react-native-elements';

const styles = StyleSheet.create({
  title: {
    color: colors.secondary,
    paddingTop: 10
  },
  genres: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.light
  },
  badge: {
    alignSelf: 'flex-start'
  },
  badgeContainer: {
    marginTop: 5
  },
  overview: {
    marginVertical: 15
  }
});

type MediaDetailTitleProps = {
  title: string;
  overview: string;
  genres: string[];
  status: string;
};

const MediaDetailTitle: FC<MediaDetailTitleProps> = memo(({ title, overview, genres, status }) => {
  return (
    <View>
      <Text h4 h4Style={ styles.title }>{ title }</Text>
      <Text style={ styles.genres }>{ genres.join(', ') }</Text>
      <Badge status={ 'error' }
             value={ status }
             containerStyle={ styles.badgeContainer }
             badgeStyle={ styles.badge }/>
      <Text style={ styles.overview }>{ overview }</Text>
    </View>
  );
});

export default MediaDetailTitle;
