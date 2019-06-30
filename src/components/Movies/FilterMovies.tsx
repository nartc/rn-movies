import { FilterhMoviesScreenProps } from '@screens/Movies/FilterMoviesScreen';
import { colors } from '@styles/Colors';
import GradientList from '@ui/GradientList';
import TopSearchBar from '@ui/TopSearchBar';
import { StackScreenComponent } from '@utils/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';

const styles = StyleSheet.create({
  flexed: {
    flex: 1
  },
});

const FilterMovies: StackScreenComponent<FilterhMoviesScreenProps> = (
  {
    navigation,
    isLoading,
    movies,
    movieType,
    fetchMoviesByPage,
    filterMovies
  }) => {
  const [page, setPage] = useState(1);
  const filteringRef = useRef(false);
  const firstLoadRef = useRef(false);

  useEffect(() => {
    if (page > 1) {
      fetchMoviesByPage(movieType, page);
    }
  }, [page]);

  const onSearchQueryChanged = useCallback((query: string) => {
    filterMovies(movieType, query);
  }, [filterMovies, movieType]);

  const onFiltering = useCallback((isFiltering: boolean) => {
    filteringRef.current = isFiltering;
  }, [filteringRef.current]);

  const onItemPressed = useCallback((id: number) => {
    navigation.navigate('MovieDetails', { id });
  }, []);

  const onEndReachedHandlerAndroid = () => {
    if (!filteringRef.current && !isLoading) {
      setPage(page + 1);
    }
  };

  const onEndReachedHandlerIos = () => {
    if (!firstLoadRef.current) {
      firstLoadRef.current = true;
      return;
    }

    if (firstLoadRef.current && !filteringRef.current && !isLoading) {
      setPage(page + 1);
    }
  };

  const onEndReachedHandler = Platform.select({
    android: onEndReachedHandlerAndroid,
    ios: onEndReachedHandlerIos
  });

  return (
    <SafeAreaView style={ styles.flexed }>
      <TopSearchBar mediaType={ movieType } onQueryChanged={ onSearchQueryChanged } setIsFiltering={ onFiltering }/>
      <Divider style={ { backgroundColor: colors.light } }/>
      <GradientList isLoading={ isLoading }
                    onItemPress={ onItemPressed }
                    data={ movies }
                    mediaType={ movieType }
                    currentPage={ page }
                    onEndReached={ onEndReachedHandler }/>
    </SafeAreaView>
  );
};

export default FilterMovies;
