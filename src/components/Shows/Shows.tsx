import { ShowsScreenProps } from '@screens/Shows/ShowsScreen';
import React, { FC, useCallback } from 'react';
import MediaContainer from '@ui/MediaContainer';

const Shows: FC<ShowsScreenProps> = ({ isLoading, populars, fetchShows }) => {
  const onItemTouched = useCallback(
    (id: number) => {
      console.log('tvshow selected -->', { id });
    },
    [populars]
  );

  return (
    <MediaContainer
      carouselItemsSource={populars}
      fetchItemsCb={fetchShows}
      isLoading={isLoading}
      mediaType={'show'}
      onItemSelected={onItemTouched}
    />
  );
};

export default Shows;
