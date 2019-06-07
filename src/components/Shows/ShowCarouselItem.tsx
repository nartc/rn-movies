import { TvShow } from '@api/Models';
import { colors } from '@styles/Colors';
import React, { FC, memo } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import Spinner from 'react-native-spinkit';

type ShowCarouselItemProps = {
  tvShow: TvShow;
  onTvShowTouched: (tvShowId: number) => void;
};
const ShowCarouselItem: FC<ShowCarouselItemProps> = memo(({ tvShow, onTvShowTouched }) => {
  return (
    <TouchableWithoutFeedback onPress={ () => onTvShowTouched(tvShow.id) }>
      <View style={ styles.carouselItemWrapper }>
        <View style={ styles.carouselItem }>
          <Image source={ { uri: tvShow.backdrop_path } }
                 containerStyle={ styles.flexed }
                 style={ styles.carouselItemImage }
                 placeholderStyle={ { backgroundColor: colors.default } }
                 PlaceholderContent={ <Spinner isVisible={ true }
                                               type={ 'Wave' }
                                               size={ 20 }
                                               color={ colors.primary }/> }/>
        </View>
        <View style={ styles.carouselBottomTextContainer }>
          <View style={ styles.carouselItemText }>
            <Text style={ styles.carouselItemTitle }>{ tvShow.name }</Text>
          </View>
          <View style={ styles.carouselItemText }>
            <Text style={ styles.carouselItemReleaseDate }>
              Votes: { tvShow.vote_count }
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default ShowCarouselItem;

const styles = StyleSheet.create({
  flexed: {
    flex: 1
  },
  carouselItemWrapper: {
    flex: 1,
    backgroundColor: colors.default,
    height: 250,
    alignItems: 'center'
  },
  carouselItem: {
    height: 250,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    alignSelf: 'stretch',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowColor: colors.secondary,
    elevation: 1
  },
  carouselItemImage: {
    flex: 1,
    borderRadius: 10
  },
  carouselBottomTextContainer: {
    bottom: 0,
    left: 0,
    zIndex: 1,
    position: 'absolute',
  },
  carouselItemText: {
    backgroundColor: colors.darkWithOpacity,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 5
  },
  carouselItemTitle: {
    paddingHorizontal: 10
  },
  carouselItemReleaseDate: {
    paddingHorizontal: 10,
    fontSize: 12
  }
});
