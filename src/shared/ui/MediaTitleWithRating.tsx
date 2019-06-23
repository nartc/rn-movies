import { colors } from '@styles/Colors';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

const styles = StyleSheet.create({
  mediaContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mediaRatingContainer: {
    justifyContent: 'flex-start'
  },
  mediaRatingText: {
    marginLeft: 5,
    fontSize: 12
  }
});

type MediaTitleWithRatingProps = {
  rating: number;
  count: number;
  title: string;
};
const MediaTitleWithRating: FC<MediaTitleWithRatingProps> = ({ rating, count, title }) => {
  return (
    <>
      <View style={ styles.mediaContent }>
        <StarRating rating={ (rating / 10) * 5 }
                    starSize={ 12 }
                    fullStarColor={ colors.primary }
                    disabled
                    containerStyle={ styles.mediaRatingContainer }/>
        <Text style={ { color: colors.secondary, ...styles.mediaRatingText } }>({ count })</Text>
      </View>
      <Text style={ { color: colors.secondary } }>{ title }</Text>
    </>
  );
};

export default MediaTitleWithRating;
