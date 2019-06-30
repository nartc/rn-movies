import { Movie, VideoSite, VideoType, FavoriteParams, WatchlistParams } from '@api/Models';
import { useDetailAnimations } from '@hooks/useDetailAnimations';
import { useFetchWithParam } from '@hooks/useFetchWithParam';
import { BlurView } from '@react-native-community/blur';
import { colors } from '@styles/Colors';
import { dimensions } from '@styles/Dimensions';
import MediaDetailHeader from '@ui/MediaDetail/MediaDetailHeader';
import MediaDetailHorizontalList from '@ui/MediaDetail/MediaDetailHorizontalList';
import MediaDetailInfo from '@ui/MediaDetail/MediaDetailInfo';
import MediaDetailLoading from '@ui/MediaDetail/MediaDetailLoading';
import MediaDetailSection from '@ui/MediaDetail/MediaDetailSection';
import MediaDetailTitle from '@ui/MediaDetail/MediaDetailTitle';
import MediaTitleWithRating from '@ui/MediaTitleWithRating';
import { StackScreenComponent } from '@utils/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, LayoutChangeEvent, View, findNodeHandle, Alert, Linking } from 'react-native';
import ActionButton, { ActionButtonItem } from 'react-native-action-button';
import { Button, Card, Icon, Image, Overlay, Text } from 'react-native-elements';
import { MovieDetailModalScreenProps } from '@screens/Movies/MovieDetailModalScreen';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';
import StarRating from 'react-native-star-rating';
import numeral from 'numeral';

const MovieDetail: StackScreenComponent<MovieDetailModalScreenProps> = (
  {
    movie,
    accountState,
    id,
    isLoading,
    fetchMovieById,
    fetchMovieAccountStates,
    toggleFavorite,
    toggleWatchlist,
    rateMovie,
    navigation
  }) => {
  const loadingMovieIdRef = useRef(0);
  const viewRef = useRef<View>(null);
  const [blurViewRef, setBlurViewRef] = useState<number | null>(null);
  const [ratingOverlayVisible, setRatingOverlayVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const { scrollYRef, animatedImageOpacity, animatedHeaderOpacity, animatedTitle, headerTranslate } = useDetailAnimations();
  useFetchWithParam(id, fetchMovieById);
  useFetchWithParam(id, fetchMovieAccountStates);

  let trailer = movie
    && movie.videos.results.find(v => v.site === VideoSite.Youtube && v.type === VideoType.Trailer);

  if (!trailer) {
    trailer = movie && movie.videos.results.find(v => v.site === VideoSite.Youtube && v.type === VideoType.Teaser);
  }

  useEffect(() => {
    if (accountState && accountState.rated && rating !== (accountState.rated as { value: number }).value) {
      setRating((accountState.rated as { value: number }).value / 2);
    }
  }, [accountState]);

  const onRecommendationPress = useCallback((movie: Movie) => {
    loadingMovieIdRef.current = movie.id;
    navigation.replace('MovieDetails', { id: movie.id });
  }, []);

  const onViewLayoutChanged = (_: LayoutChangeEvent) => {
    if (!blurViewRef) {
      setBlurViewRef(findNodeHandle(viewRef.current));
    }
  };

  const onFavoritePress = useCallback(() => {
    toggleFavorite(new FavoriteParams('movie', movie.id, !accountState.favorite));
  }, [movie, accountState]);

  const onWatchlistPress = useCallback(() => {
    toggleWatchlist(new WatchlistParams('movie', movie.id, !accountState.watchlist));
  }, [movie, accountState]);

  const onRatingPress = useCallback(() => {
    setRatingOverlayVisible(true);
  }, []);

  const onCancelRatingPress = () => {
    setRating(accountState.rated ? (accountState.rated as { value: number }).value / 2 : 0);
    setRatingOverlayVisible(false);
  };

  const onConfirmRatingPress = () => {
    if (rating > 0) {
      rateMovie(movie.id, rating * 2);
      setRatingOverlayVisible(false);
    } else {
      Alert.alert('Warning', 'Rating cannot be 0');
    }
  };

  const onViewTrailerPress = () => {
    if (trailer) {
      Linking.openURL(`https://www.youtube.com/watch?v=${ trailer.key }`);
    }
  };

  return isLoading || !movie || (movie && loadingMovieIdRef.current && movie.id !== loadingMovieIdRef.current)
         ? <MediaDetailLoading/>
         : (
           <>
             <View style={ { flex: 1 } } ref={ viewRef } onLayout={ onViewLayoutChanged }>
               <MediaDetailHeader animatedImageOpacity={ animatedImageOpacity }
                                  animatedHeaderOpacity={ animatedHeaderOpacity }
                                  animatedTitle={ animatedTitle }
                                  headerTranslate={ headerTranslate }
                                  headerText={ movie.title }
                                  headerImage={ movie.images.posters[movie.images.posters.length - 1].file_path }
                                  onPop={ () => navigation.pop() }/>
               <Animated.ScrollView style={ { flex: 1 } }
                                    scrollEventThrottle={ 1 }
                                    onScroll={ Animated.event([{ nativeEvent: { contentOffset: { y: scrollYRef.current } } }],
                                      { useNativeDriver: true }) }>
                 <View style={ { flex: 1, paddingHorizontal: 10, marginTop: 555 } }>
                   <MediaDetailTitle title={ movie.title }
                                     overview={ movie.overview }
                                     genres={ movie.genre_names as string[] }
                                     status={ movie.status }/>
                   <MediaDetailSection sectionTitle={ 'More info' } containerStyle={ { flex: 1, marginBottom: 10 } }>
                     <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
                       <MediaDetailInfo infoTitle={ 'Release on' } infoText={ movie.release_date }/>
                       <MediaDetailInfo infoTitle={ 'Runtime' } infoText={ `${ movie.runtime } minutes` }/>
                       <MediaDetailInfo infoTitle={ 'Rating' }
                                        infoComponent={ <StarRating rating={ (movie.vote_average / 10) * 5 }
                                                                    starSize={ 12 }
                                                                    fullStarColor={ colors.primary }
                                                                    disabled
                                                                    containerStyle={ { justifyContent: 'flex-start' } }/> }/>
                       <MediaDetailInfo infoTitle={ 'Vote count' } infoText={ movie.vote_count.toString() }/>
                       { !!movie.budget && (
                         <MediaDetailInfo infoTitle={ 'Budget' } infoText={ numeral(movie.budget).format('$0,0.00') }/>
                       ) }
                     </View>
                   </MediaDetailSection>
                   <MediaDetailSection sectionTitle={ 'Casts' }>
                     <MediaDetailHorizontalList items={ movie.credits.cast } imageProp={ 'profile_path' }>
                       { item => (
                         <>
                           <Text style={ { fontSize: 10, textAlign: 'center' } }>{ item.name }</Text>
                           <Text style={ { fontSize: 8, textAlign: 'center' } }>as</Text>
                           <Text style={ { fontSize: 10, textAlign: 'center' } }>{ item.character }</Text>
                         </>
                       ) }
                     </MediaDetailHorizontalList>
                   </MediaDetailSection>

                   { !!movie.credits.crew.length && (
                     <MediaDetailSection sectionTitle={ 'Crews' }>
                       <MediaDetailHorizontalList items={ movie.credits.crew } imageProp={ 'profile_path' }>
                         { item => (
                           <>
                             <Text style={ { fontSize: 10, textAlign: 'center' } }>{ item.name }</Text>
                             <Text style={ { fontSize: 8, textAlign: 'center' } }>as</Text>
                             <Text style={ { fontSize: 10, textAlign: 'center' } }>{ item.job }</Text>
                           </>
                         ) }
                       </MediaDetailHorizontalList>
                     </MediaDetailSection>
                   ) }

                   { !!movie.production_companies.length && (
                     <MediaDetailSection sectionTitle={ 'Companies' }>
                       <MediaDetailHorizontalList items={ movie.production_companies }
                                                  imageProp={ 'logo_path' }
                                                  height={ 100 }>
                         { item => <Text style={ { fontSize: 10, textAlign: 'center' } }>{ item.name }</Text> }
                       </MediaDetailHorizontalList>
                     </MediaDetailSection>
                   ) }

                   <MediaDetailSection sectionTitle={ 'Galleries' } containerStyle={ { marginBottom: 10 } }>
                     <FlatList data={ movie.images.backdrops }
                               keyExtractor={ (item, index) => item.file_path + index }
                               numColumns={ 2 }
                               renderItem={ info => (
                                 <Image source={ { uri: info.item.file_path } }
                                        ImageComponent={ FastImage }
                                        style={ {
                                          width: (dimensions.width - 20) / 2,
                                          height: (dimensions.width - 20) / 2
                                        } }
                                        PlaceholderContent={ <Spinner isVisible={ true }
                                                                      color={ colors.primary }
                                                                      type={ 'FadingCircle' }
                                        /> }
                                 />
                               ) }
                     />
                   </MediaDetailSection>

                   { !!movie.recommendations.results.length && (
                     <MediaDetailSection sectionTitle={ 'Recommendations' }>
                       <MediaDetailHorizontalList items={ movie.recommendations.results }
                                                  imageProp={ 'poster_path' }
                                                  wrapperStyle={ { paddingHorizontal: 0 } }
                                                  onPress={ onRecommendationPress }>
                         { item => (
                           <MediaTitleWithRating rating={ item.vote_average }
                                                 count={ item.vote_count }
                                                 title={ item.title }/>
                         ) }
                       </MediaDetailHorizontalList>
                     </MediaDetailSection>
                   ) }
                 </View>
               </Animated.ScrollView>
             </View>
             <Overlay isVisible={ ratingOverlayVisible }
                      onBackdropPress={ () => setRatingOverlayVisible(false) }
                      width={ 'auto' }
                      height={ 'auto' }>
               <View>
                 <StarRating fullStarColor={ colors.primary }
                             rating={ rating }
                             selectedStar={ setRating }/>
                 <View style={ { flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' } }>
                   <Button title={ 'Cancel' }
                           type={ 'clear' }
                           onPress={ onCancelRatingPress }
                           titleStyle={ { color: colors.dark } }
                           buttonStyle={ { backgroundColor: colors.secondary } }/>
                   <Button title={ 'Confirm' }
                           type={ 'clear' }
                           onPress={ onConfirmRatingPress }
                           titleStyle={ { color: colors.primary } }
                           buttonStyle={ { backgroundColor: colors.secondary } }/>
                 </View>
               </View>
             </Overlay>
             { accountState && (
               <ActionButton renderIcon={ active => <Icon name={ active ? 'plus' : 'filter-variant' }/> }
                             buttonColor={ 'rgba(255, 255, 255, 1)' }
                             size={ 40 }
                             hideShadow
                             backdrop={ <BlurView blurType={ 'light' }
                                                  viewRef={ blurViewRef }
                                                  style={ {
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0
                                                  } }/> }>
                 <ActionButton.Item title={ 'Rate It' }>
                   <Icon name={ !!accountState.rated ? 'star' : 'star-outline' }
                         color={ '#fae43c' }
                         onPress={ onRatingPress }/>
                 </ActionButton.Item>
                 <ActionButton.Item title={ accountState.watchlist ? 'Remove from Watchlist' : 'Add to Watchlist' }
                                    onPress={ onWatchlistPress }>
                   <Icon name={ accountState.watchlist ? 'bookmark-remove' : 'bookmark-plus' } color={ '#1b91fe' }/>
                 </ActionButton.Item>
                 <ActionButton.Item title={ accountState.favorite ? 'Remove from Favorite' : 'Add to Favorite' }
                                    onPress={ onFavoritePress }>
                   <Icon name={ accountState.favorite ? 'heart' : 'heart-outline' } color={ '#fa393a' }/>
                 </ActionButton.Item>
                 { !!trailer && (
                   <ActionButton.Item title={ 'View Trailer' } onPress={ onViewTrailerPress }>
                     <Icon name={ 'youtube' } color={ colors.primary }/>
                   </ActionButton.Item>
                 ) }
               </ActionButton>
             ) }
           </>
         );
};

export default MovieDetail;
