import CenterView from '@ui/CenterView';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Text } from 'react-native-elements';
import { MoviesScreenProps } from '@screens/Movies/MoviesScreen';
import Spinner from 'react-native-spinkit';
import { colors } from '@styles/Colors';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Movie } from '@api/Models';
import { dimensions } from '@styles/Dimensions';

const Movies: FC<MoviesScreenProps> = ({ fetchMovies, fetchConfiguration, nowPlayings, isLoading }) => {
  const carouselItemsRef = useRef<Movie[]>([]);

  const getCarouselItems = useCallback(() => {
    if (!carouselItemsRef.current.length && !isLoading && !!nowPlayings.length) {
      carouselItemsRef.current = nowPlayings.slice(0, 10);
    }
    return carouselItemsRef.current;
  }, [isLoading, nowPlayings]);

  useEffect(() => {
    fetchConfiguration();
    fetchMovies();
  }, []);

  const renderCarouselItem = (item: { item: Movie; index: number }) => {
    return (
      <View style={ styles.carouselItemWrapper }>
        <View style={ styles.carouselItem }>
          <Text h4>{ item.item.original_title }</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={ styles.flexed }>
      { isLoading ? (
        <CenterView>
          <Spinner isVisible={ isLoading } color={ colors.primary } type={ 'Bounce' }/>
        </CenterView>
      ) : (
        <ScrollView style={ styles.flexed }>
          <Carousel data={ getCarouselItems() }
                    renderItem={ renderCarouselItem }
                    sliderWidth={ dimensions.width }
                    itemWidth={ dimensions.width - 50 }
                    horizontal/>
        </ScrollView>
      ) }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexed: {
    flex: 1
  },
  carouselItemWrapper: {
    flex: 1,
    backgroundColor: colors.default,
    height: 300,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'yellow'
  },
  carouselItem: {
    height: 250,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignSelf: 'stretch',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowColor: colors.secondary,
    elevation: 1
  }
});

export default Movies;
