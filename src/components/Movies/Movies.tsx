import { MovieEndpointsPath } from '@api/Models';
import MediaHorizontalList from '@ui/MediaHorizontalList';
import { StackScreenComponent } from '@utils/types';
import React, { useCallback } from 'react';
import { MoviesScreenProps } from '@screens/Movies/MoviesScreen';
import MediaContainer from '@ui/MediaContainer';

const Movies: StackScreenComponent<MoviesScreenProps> = ({ fetchMovies, nowPlayings, isLoading, populars, upcomings, topRateds, navigation }) => {
  const onItemSelected = useCallback(
    (id: number) => {
      console.log('movie selected --> ', { id });
      navigation.navigate('MovieDetails', { id });
    },
    [nowPlayings, populars, upcomings, topRateds]
  );

  const onViewMorePressed = (type: MovieEndpointsPath) => () => {
    console.log('movie type -->', type);
    navigation.navigate('FilterMovies', { movieType: type });
  };

  return (
    <MediaContainer carouselItemsSource={ nowPlayings }
                    fetchItemsCb={ fetchMovies }
                    isLoading={ isLoading }
                    mediaType={ 'movie' }
                    onItemSelected={ onItemSelected }>
      <MediaHorizontalList title={ 'Popular' }
                           medias={ populars }
                           mediaType={ 'movie' }
                           onMediaSelected={ onItemSelected }
                           onViewMorePressed={ onViewMorePressed('popular') }/>

      <MediaHorizontalList title={ 'Now Playing' }
                           medias={ nowPlayings }
                           mediaType={ 'movie' }
                           onMediaSelected={ onItemSelected }
                           onViewMorePressed={ onViewMorePressed('now_playing') }/>

      <MediaHorizontalList title={ 'Top Rated' }
                           medias={ topRateds }
                           mediaType={ 'movie' }
                           onMediaSelected={ onItemSelected }
                           onViewMorePressed={ onViewMorePressed('top_rated') }/>

      <MediaHorizontalList title={ 'Upcoming' }
                           medias={ upcomings }
                           mediaType={ 'movie' }
                           onMediaSelected={ onItemSelected }
                           onViewMorePressed={ onViewMorePressed('upcoming') }/>
    </MediaContainer>
  );
};

export default Movies;
