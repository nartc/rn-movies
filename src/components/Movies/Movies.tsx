import React, { FC, useEffect } from 'react';
import { Text } from 'react-native-elements';
import { MoviesScreenProps } from '@screens/Movies/MoviesScreen';
import CenterView from '@ui/CenterView';

const Movies: FC<MoviesScreenProps> = ({ fetchMovies, nowPlayings, navigation }) => {
  return (
    <CenterView>
      <Text>Movies</Text>
    </CenterView>
  );
};

export default Movies;
