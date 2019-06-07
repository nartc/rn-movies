import { TvShow } from '@api/Models';
import ShowCarouselItem from '@components/Shows/ShowCarouselItem';
import { ShowsScreenProps } from '@screens/Shows/ShowsScreen';
import { colors } from '@styles/Colors';
import { dimensions } from '@styles/Dimensions';
import CenterView from '@ui/CenterView';
import React, { FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Spinner from 'react-native-spinkit';
import { useCarouselItem } from '@hooks/useCarouselItem';
import { useFetch } from '@hooks/useFetch';

const Shows: FC<ShowsScreenProps> = ({ isLoading, populars, fetchShows }) => {
  const carouselItems = useCarouselItem<TvShow>(populars, isLoading);
  useFetch(fetchShows);

  const onItemTouched = (id: number) => {
    console.log({ id });
  };

  const renderCarouselItem = (item: { item: TvShow, index: number }) => {
    return <ShowCarouselItem tvShow={ item.item } onTvShowTouched={ onItemTouched }/>;
  };

  return (
    <SafeAreaView style={ styles.flexed }>
      { isLoading || !populars.length ? (
        <CenterView>
          <Spinner isVisible={ isLoading } color={ colors.primary } type={ 'Bounce' }/>
        </CenterView>
      ) : (
        <ScrollView style={ styles.flexed }>
          <Carousel data={ carouselItems }
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
  }
});

export default Shows;
