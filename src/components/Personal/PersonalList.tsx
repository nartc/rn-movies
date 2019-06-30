import { AccountMediaType, Movie, TvShow } from '@api/Models';
import { useFetchWithPayload } from '@hooks/useFetch';
import { PersonalListScreenProps } from '@screens/Personal/PersonalListScreen';
import { colors } from '@styles/Colors';
import CenterView from '@ui/CenterView';
import GradientList from '@ui/GradientList';
import { AccountTab, StackScreenComponent } from '@utils/types';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { ButtonGroup, Text } from 'react-native-elements';
import Spinner from 'react-native-spinkit';

const PersonalList: StackScreenComponent<PersonalListScreenProps, { title: string, type: AccountMediaType }> =
  props => {
    const { navigation, isLoading, getAccountMovies, getAccountShows, ...medias } = props;

    const [moviesPage, setMoviesPage] = useState(0);
    const [showsPage, setShowsPage] = useState(0);

    const [selected, setSelected] = useState(AccountTab.Movie);
    const mediaType = useMemo(() => navigation.getParam('type'), []);
    const title = useMemo(() => navigation.getParam('title'), []);

    useFetchWithPayload(1, mediaType)(getAccountMovies);
    useFetchWithPayload(1, mediaType)(getAccountShows);

    const onTabChanged = (selectedIndex: number) => {
      if (selectedIndex !== selected) {
        setSelected(selectedIndex);
      }
    };

    const onItemPress = (id: number) => {
    };
    const onEndReachedHandler = () => {
    };

    const renderMovies = () => {
      const movies = (medias as any)[`${ mediaType }Movies`] as Movie[];
      return !!movies.length ? (
        <GradientList isLoading={ isLoading }
                      onItemPress={ onItemPress }
                      data={ movies }
                      currentPage={ moviesPage }
                      onEndReached={ onEndReachedHandler }/>
      ) : (
               <CenterView>
                 <Text>Nothing in { title }</Text>
               </CenterView>
             );
    };

    const renderShows = () => {
      const shows = (medias as any)[`${ mediaType }Shows`] as TvShow[];
      return !!shows.length ? (
        <GradientList isLoading={ isLoading }
                      onItemPress={ onItemPress }
                      data={ shows }
                      currentPage={ moviesPage }
                      onEndReached={ onEndReachedHandler }/>
      ) : (
               <CenterView>
                 <Text>Nothing in { title }</Text>
               </CenterView>
             );
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
