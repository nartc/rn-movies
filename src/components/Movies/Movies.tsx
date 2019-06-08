import React, { FC, useCallback } from 'react';
import { MoviesScreenProps } from '@screens/Movies/MoviesScreen';
import MediaContainer from '@ui/MediaContainer';

const Movies: FC<MoviesScreenProps> = ({ fetchMovies, nowPlayings, isLoading }) => {
  const onItemTouched = useCallback(
    (id: number) => {
      console.log('movie selected --> ', { id });
    },
    [nowPlayings]
  );
  return (
    <MediaContainer
      carouselItemsSource={nowPlayings}
      fetchItemsCb={fetchMovies}
      isLoading={isLoading}
      mediaType={'movie'}
      onItemSelected={onItemTouched}
    />
  );
};

export default Movies;
