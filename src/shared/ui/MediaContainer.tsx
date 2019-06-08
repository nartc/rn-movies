import React, { FC, memo } from 'react';
import { Platform, SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { Action } from 'typesafe-actions';
import { Movie, TvShow } from '@api/Models';
import { useCarouselItem } from '@hooks/useCarouselItem';
import { useFetch } from '@hooks/useFetch';
import CarouselItem from './CarouselItem';
import CenterView from './CenterView';
import Spinner from 'react-native-spinkit';
import { colors } from '@styles/Colors';
import Carousel from 'react-native-snap-carousel';
import { dimensions } from '@styles/Dimensions';

type MediaContainerProps = {
  isLoading: boolean;
  carouselItemsSource: Movie[] | TvShow[];
  mediaType: 'show' | 'movie';
  fetchItemsCb: () => Action;
  onItemSelected: (id: number) => void;
};
const MediaContainer: FC<MediaContainerProps> = memo(
  ({ mediaType, carouselItemsSource, isLoading, fetchItemsCb, onItemSelected, children }) => {
    const carouselItems = useCarouselItem<Movie | TvShow>(carouselItemsSource as Movie[] | TvShow[], isLoading);
    useFetch(fetchItemsCb);

    const SafeView = Platform.OS === 'ios' ? SafeAreaView : View;

    const renderCarouselItem = (item: { item: Movie | TvShow; index: number }) => {
      const carouselItemProps =
        mediaType === 'movie'
          ? {
              title: (item.item as Movie).title,
              releaseDate: (item.item as Movie).release_date
            }
          : { name: (item.item as TvShow).name, voteCount: item.item.vote_count };

      return (
        <CarouselItem
          id={item.item.id}
          onItemTouched={onItemSelected}
          backdropPath={item.item.backdrop_path}
          {...carouselItemProps}
        />
      );
    };

    return (
      <SafeView style={styles.flexed}>
        {isLoading || !carouselItemsSource.length ? (
          <CenterView>
            <Spinner isVisible={isLoading} color={colors.primary} type={'Bounce'} />
          </CenterView>
        ) : (
          <ScrollView style={styles.flexed}>
            <Carousel
              data={carouselItems}
              renderItem={renderCarouselItem}
              sliderWidth={dimensions.width}
              itemWidth={dimensions.width - 50}
              horizontal
            />
            {children}
          </ScrollView>
        )}
      </SafeView>
    );
  }
);
export default MediaContainer;

const styles = StyleSheet.create({
  flexed: {
    flex: 1
  }
});
