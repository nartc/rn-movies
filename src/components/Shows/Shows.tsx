import { ShowEndpointsPath } from '@api/Models';
import { ShowsScreenProps } from '@screens/Shows/ShowsScreen';
import MediaHorizontalList from '@ui/MediaHorizontalList';
import { StackScreenComponent } from '@utils/types';
import React, { useCallback } from 'react';
import MediaContainer from '@ui/MediaContainer';

const Shows: StackScreenComponent<ShowsScreenProps> = (
  {
    isLoading,
    populars,
    fetchShows,
    airingTodays,
    onTheAirs,
    topRateds,
    navigation
  }) => {
  const onItemTouched = useCallback(
    (id: number) => {
      navigation.navigate('ShowDetails', { id });
    },
    [populars, airingTodays, onTheAirs, topRateds]
  );

  const onViewMorePressed = (type: ShowEndpointsPath) => () => {
    console.log('tvshow type -->', type);
  };

  return (
    <MediaContainer carouselItemsSource={ populars }
                    fetchItemsCb={ fetchShows }
                    isLoading={ isLoading }
                    mediaType={ 'show' }
                    onItemSelected={ onItemTouched }>
      <MediaHorizontalList title={ 'Airing Today' }
                           medias={ airingTodays }
                           mediaType={ 'show' }
                           onMediaSelected={ onItemTouched }
                           onViewMorePressed={ onViewMorePressed('airing_today') }/>
      <MediaHorizontalList title={ 'Popular' }
                           medias={ populars }
                           mediaType={ 'show' }
                           onMediaSelected={ onItemTouched }
                           onViewMorePressed={ onViewMorePressed('popular') }/>
      <MediaHorizontalList title={ 'Top Rated' }
                           medias={ topRateds }
                           mediaType={ 'show' }
                           onMediaSelected={ onItemTouched }
                           onViewMorePressed={ onViewMorePressed('top_rated') }/>
      <MediaHorizontalList title={ 'On The Air' }
                           medias={ onTheAirs }
                           mediaType={ 'show' }
                           onMediaSelected={ onItemTouched }
                           onViewMorePressed={ onViewMorePressed('on_the_air') }/>
    </MediaContainer>
  );
};

export default Shows;
