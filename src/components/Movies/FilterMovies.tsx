import { Movie } from '@api/Models';
import { useDebounce } from '@hooks/useDebounce';
import { FilterhMoviesScreenProps } from '@screens/Movies/FilterMoviesScreen';
import { colors } from '@styles/Colors';
import CenterView from '@ui/CenterView';
import GradientListItem from '@ui/GradientListItem';
import { movieTypesMap } from '@utils/constants';
import { StackScreenComponent } from '@utils/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Platform, SafeAreaView } from 'react-native';
import { Divider, SearchBar, Text } from 'react-native-elements';
import Spinner from 'react-native-spinkit';

const FilterMovies: StackScreenComponent<FilterhMoviesScreenProps> = ({ navigation, isLoading, movies, movieType, fetchMoviesByPage, filterMovies }) => {
  const [page, setPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const firstLoadRef = useRef(false);

  useEffect(() => {
    if (page > 1) {
      fetchMoviesByPage(movieType, page);
    }
  }, [page]);

  useEffect(() => {
    filterMovies(movieType, debouncedQuery);
  }, [debouncedQuery]);

  const renderMovieItem = (item: { item: Movie, index: number }) => (
    <GradientListItem leftAvatar={ {
      source: { uri: item.item.poster_path },
      icon: { name: 'image', type: 'material-community' }
    } }
                      linearGradientProps={ {
                        colors: ['#232526', '#414345'],
                        start: { x: 1, y: 0 },
                        end: { x: 0, y: 0.2 },
                      } }
                      containerStyle={ {
                        backgroundColor: colors.default,
                        marginHorizontal: 10,
                        marginVertical: 5,
                        flex: 1,
                        padding: 10,
                        borderRadius: 10
                      } }
                      title={ item.item.title }
                      titleStyle={ { fontSize: 14 } }
                      subtitle={ (item.item.genre_names as string[]).join(', ') }
                      subtitleStyle={ { fontWeight: 'bold', color: colors.light, fontSize: 10 } }
                      onPress={ () => navigation.navigate('MovieDetails', { id: item.item.id }) }/>
  );

  const onEndReachedHandlerAndroid = () => {
    if (!isFiltering && !isLoading) {
      setPage(page + 1);
    }
  };

  const onEndReachedHandlerIos = () => {
    if (!firstLoadRef.current) {
      firstLoadRef.current = true;
      return;
    }

    if (firstLoadRef.current && !isFiltering && !isLoading) {
      setPage(page + 1);
    }
  };

  const renderFooter = () => (
    <CenterView>
      <Spinner isVisible={ isLoading } type={ 'Bounce' } size={ 18 } color={ colors.primary }/>
    </CenterView>
  );

  return (
    <SafeAreaView style={ { flex: 1 } }>
      <SearchBar platform={ Platform.OS === 'ios' ? 'ios' : 'android' }
                 placeholder={ `Filter ${ movieTypesMap[movieType] }` }
                 placeholderTextColor={ colors.secondary }
                 value={ query }
                 onChangeText={ text => {
                   setIsFiltering(!!text);
                   setQuery(text);
                 } }
                 containerStyle={ { backgroundColor: colors.default } }
                 inputContainerStyle={ {
                   backgroundColor: colors.default,
                   borderWidth: 1,
                   borderBottomWidth: 1,
                   borderColor: colors.secondary,
                   borderTopColor: colors.secondary,
                   borderBottomColor: colors.secondary,
                   borderRadius: 20
                 } }
                 inputStyle={ { color: colors.secondary, borderColor: colors.secondary } }
                 cancelButtonProps={ { color: colors.primary } }
                 clearIcon={ { color: colors.secondary, name: 'close', type: 'material-community' } }
                 cancelIcon={ { color: colors.secondary, name: 'arrow-left', type: 'material-community' } }
                 searchIcon={ { color: colors.secondary, name: 'magnify', type: 'material-community' } }/>
      <Divider style={ { backgroundColor: colors.light } }/>
      <FlatList data={ movies }
                key={ movieType }
                extraData={ page }
                ListFooterComponent={ renderFooter }
                ListEmptyComponent={ <CenterView><Text>No movies</Text></CenterView> }
                renderItem={ renderMovieItem }
                keyExtractor={ item => item.id.toString() }
                showsHorizontalScrollIndicator={ false }
                scrollEventThrottle={ 16 }
                onEndReached={ Platform.OS === 'ios' ? onEndReachedHandlerIos : onEndReachedHandlerAndroid }
                onEndReachedThreshold={ 0.2 }/>
    </SafeAreaView>
  );
};

export default FilterMovies;
