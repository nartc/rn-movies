import { Movie, TvShow } from '@api/Models';
import { colors } from '@styles/Colors';
import MediaTitleWithRating from '@ui/MediaTitleWithRating';
import React, { FC, memo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-elements';

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
  }
});

type MediaHorizontalListProps = {
  title: string;
  medias: Array<TvShow | Movie>;
  mediaType: 'movie' | 'show';
  onMediaSelected: (mediaId: number) => void;
  onViewMorePressed: () => void;
};
const MediaHorizontalList: FC<MediaHorizontalListProps> = memo(({ medias, mediaType, title, onMediaSelected, onViewMorePressed }) => {
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
          <TouchableOpacity key={ media.id } onPress={ () => onMediaSelected(media.id) }>
            <Card image={ { uri: media.poster_path } }
                  imageStyle={ styles.mediaImage }
                  containerStyle={ styles.mediaContainer }
                  wrapperStyle={ styles.mediaWrapper }>
              <MediaTitleWithRating rating={ media.vote_average }
                                    count={ media.vote_count }
                                    title={ mediaType === 'movie' ? (media as Movie).title : (media as TvShow).name }/>
            </Card>
          </TouchableOpacity>
        )) }
      </ScrollView>
    </View>
  );
});

export default MediaHorizontalList;
