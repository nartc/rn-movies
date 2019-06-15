import { Movie, TvShow } from '@api/Models';
import { colors } from '@styles/Colors';
import React, { FC } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

const styles = StyleSheet.create({
  mediaListContainer: {
    marginVertical: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  whiteText: {
    color: colors.secondary
  },
  headerButton: {
    backgroundColor: colors.default
  },
  divider: {
    backgroundColor: colors.secondary,
    marginHorizontal: 15
  },
  mediaImage: {
    height: 200,
    width: 150
  },
  mediaContainer: {
    width: 150,
    borderWidth: 0,
    backgroundColor: colors.default
  },
  mediaWrapper: {
    paddingHorizontal: 0
  },
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

type MediaHorizontalListProps = {
  title: string;
  medias: Array<TvShow | Movie>;
  mediaType: 'movie' | 'show';
  onMediaSelected: (mediaId: number) => void;
  onViewMorePressed: () => void;
};
const MediaHorizontalList: FC<MediaHorizontalListProps> = ({ medias, mediaType, title, onMediaSelected, onViewMorePressed }) => {
  return (
    <View style={ styles.mediaListContainer }>
      <View style={ styles.headerContainer }>
        <Text h4 h4Style={ styles.whiteText }>{ title }</Text>
        <Button type={ 'clear' }
                title={ 'View More' }
                buttonStyle={ styles.headerButton }
                titleStyle={ styles.whiteText }
                onPress={ onViewMorePressed }/>
      </View>
      <Divider style={ styles.divider }/>
      <ScrollView showsHorizontalScrollIndicator={ false } horizontal>
        { medias.map(media => (
          <TouchableWithoutFeedback key={ media.id } onPress={ () => onMediaSelected(media.id) }>
            <Card image={ { uri: media.poster_path } }
                  imageStyle={ styles.mediaImage }
                  containerStyle={ styles.mediaContainer }
                  wrapperStyle={ styles.mediaWrapper }>
              <View style={ styles.mediaContent }>
                <StarRating rating={ (media.vote_average / 10) * 5 }
                            starSize={ 12 }
                            fullStarColor={ colors.primary }
                            disabled
                            containerStyle={ styles.mediaRatingContainer }/>
                <Text style={ { ...styles.whiteText, ...styles.mediaRatingText } }>({ media.vote_count })</Text>
              </View>
              <Text style={ styles.whiteText }>{ mediaType === 'movie' ? (media as Movie).title : (media as TvShow).name }</Text>
            </Card>
          </TouchableWithoutFeedback>
        )) }
      </ScrollView>
    </View>
  );
};

export default MediaHorizontalList;
