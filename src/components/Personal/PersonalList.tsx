import { AccountMediaType, Movie, TvShow } from '@api/Models';
import { useFetchWithPayload } from '@hooks/useFetch';
import { PersonalListScreenProps } from '@screens/Personal/PersonalListScreen';
import { colors } from '@styles/Colors';
import CenterView from '@ui/CenterView';
import GradientList from '@ui/GradientList';
import { AccountTab, StackScreenComponent } from '@utils/types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { ButtonGroup, Text } from 'react-native-elements';
import Spinner from 'react-native-spinkit';

const PersonalList: StackScreenComponent<PersonalListScreenProps, { title: string, type: AccountMediaType }> =
  props => {
    const { navigation, isLoading, getAccountMovies, getAccountShows, ...medias } = props;

    const [moviesPage, setMoviesPage] = useState(1);
    const [showsPage, setShowsPage] = useState(1);
    const [selected, setSelected] = useState(AccountTab.Movie);

    const firstLoadRef = useRef(false);

    const mediaType = useMemo(() => navigation.getParam('type'), []);
    const title = useMemo(() => navigation.getParam('title'), []);

    useFetchWithPayload(1, mediaType)(getAccountMovies);
    useFetchWithPayload(1, mediaType)(getAccountShows);

    useEffect(() => {
      if (moviesPage > 1) {
        getAccountMovies(moviesPage, mediaType);
      }
    }, [moviesPage, mediaType]);

    useEffect(() => {
      if (showsPage > 1) {
        getAccountShows(showsPage, mediaType);
      }
    }, [showsPage, mediaType]);

    const onTabChanged = (selectedIndex: number) => {
      if (selectedIndex !== selected) {
        setSelected(selectedIndex);
      }
    };

    const onEndReachedHandlerAndroid = () => {
      if (!isLoading) {
        if (selected === AccountTab.Movie) {
          setMoviesPage(moviesPage + 1);
        } else {
          setShowsPage(showsPage + 1);
        }
      }
    };

    const onEndReachedHandlerIos = () => {
      if (!firstLoadRef.current) {
        firstLoadRef.current = true;
        return;
      }

      if (firstLoadRef.current && !isLoading) {
        if (selected === AccountTab.Movie) {
          setMoviesPage(moviesPage + 1);
        } else {
          setShowsPage(showsPage + 1);
        }
      }
    };

    const onItemPress = (id: number) => {
      navigation.navigate('MovieDetails', { id });
    };

    const onEndReachedHandler = Platform.select({
      ios: onEndReachedHandlerIos,
      android: onEndReachedHandlerAndroid
    });

    const renderEmptyListPlaceholder = () => (
      <CenterView>
        <Text>Nothing in { title }</Text>
      </CenterView>
    );

    const renderMovies = () => {
      const movies = (medias as any)[`${ mediaType }Movies`] as Movie[];
      return !!movies.length ? (
        <GradientList isLoading={ isLoading }
                      onItemPress={ onItemPress }
                      data={ movies }
                      currentPage={ moviesPage }
                      onEndReached={ movies.length >= 20 ? onEndReachedHandler : () => {
                      } }/>
      ) : renderEmptyListPlaceholder();
    };

    const renderShows = () => {
      const shows = (medias as any)[`${ mediaType }Shows`] as TvShow[];
      return !!shows.length ? (
        <GradientList isLoading={ isLoading }
                      onItemPress={ onItemPress }
                      data={ shows }
                      currentPage={ moviesPage }
                      onEndReached={ shows.length >= 20 ? onEndReachedHandler : () => {
                      } }/>
      ) : renderEmptyListPlaceholder();
    };

    return isLoading
           ? (
             <CenterView>
               <Spinner isVisible={ true } size={ 20 } type={ 'FadingCircle' } color={ colors.primary }/>
               <Text>Loading { title }...</Text>
             </CenterView>
           )
           : (
             <View style={ { flex: 1 } }>
               <ButtonGroup selectedIndex={ selected }
                            buttons={ ['Movie', 'TV Show'] }
                            onPress={ onTabChanged }
                            containerStyle={ { backgroundColor: colors.default } }
                            textStyle={ { color: colors.secondary } }
                            selectedButtonStyle={ { backgroundColor: colors.primary } }/>
               { selected === AccountTab.Movie ? renderMovies() : renderShows() }
             </View>
           );
  };

PersonalList.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title', 'List')
});

export default PersonalList;
