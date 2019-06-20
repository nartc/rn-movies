import { MovieVideoSite, MovieVideoType, TvShow } from '@api/Models';
import { useDetailAnimations } from '@hooks/useDetailAnimations';
import { useFetchWithParam } from '@hooks/useFetchWithParam';
import { ShowDetailModalScreenProps } from '@screens/Shows/ShowDetailModalScreen';
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
import React from 'react';
import { Animated, FlatList, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import StarRating from 'react-native-star-rating';

const ShowDetail: StackScreenComponent<ShowDetailModalScreenProps> = ({ isLoading, show, id, fetchShowById, navigation }) => {
  const { scrollYRef, animatedImageHeight, animatedImageTranslateY, animatedImageOpacity, animatedHeaderOpacity, animatedTitle } = useDetailAnimations();
  useFetchWithParam(id, fetchShowById);

  const trailer = show
    && show.videos.results.find(v => v.site === MovieVideoSite.Youtube
      && (v.type === MovieVideoType.Trailer || v.type === MovieVideoType.Teaser));

  const onRecommendationPress = (item: TvShow) => {
    navigation.replace('ShowDetails', { id: item.id });
  };

  return isLoading || !show ? (
    <MediaDetailLoading/>
  ) : (
    <View style={ { flex: 1 } }>
      <MediaDetailHeader animatedImageHeight={ animatedImageHeight }
                         animatedImageTranslateY={ animatedImageTranslateY }
                         animatedImageOpacity={ animatedImageOpacity }
                         animatedHeaderOpacity={ animatedHeaderOpacity }
                         animatedTitle={ animatedTitle }
                         headerText={ show.name }
                         headerImage={ show.images.posters[show.images.posters.length - 1].file_path }
                         onPop={ navigation.pop }/>
      <Animated.ScrollView style={ { flex: 1 } }
                           scrollEventThrottle={ 16 }
                           onScroll={ Animated.event([{ nativeEvent: { contentOffset: { y: scrollYRef.current } } }]) }>
        <View style={ { flex: 1, paddingHorizontal: 10 } }>
          <MediaDetailTitle title={ show.name }
                            overview={ show.overview }
                            genres={ show.genre_names as string[] }
                            status={ show.status }/>
          <MediaDetailSection sectionTitle={ 'More info' } containerStyle={ { flex: 1, marginBottom: 10 } }>
            <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
              <MediaDetailInfo infoTitle={ 'Rating' }
                               infoComponent={ <StarRating rating={ (show.vote_average / 10) * 5 }
                                                           starSize={ 12 }
                                                           fullStarColor={ colors.primary }
                                                           disabled
                                                           containerStyle={ { justifyContent: 'flex-start' } }/> }/>
              <MediaDetailInfo infoTitle={ 'Vote count' } infoText={ show.vote_count.toString() }/>
            </View>
          </MediaDetailSection>

          { !!show.credits.cast.length && (
            <MediaDetailSection sectionTitle={ 'Casts' }>
              <MediaDetailHorizontalList items={ show.credits.cast } imageProp={ 'profile_path' }>
                { item => (
                  <>
                    <Text style={ { fontSize: 10, textAlign: 'center' } }>{ item.name }</Text>
                    <Text style={ { fontSize: 8, textAlign: 'center' } }>as</Text>
                    <Text style={ { fontSize: 10, textAlign: 'center' } }>{ item.character }</Text>
                  </>
                ) }
              </MediaDetailHorizontalList>
            </MediaDetailSection>
          ) }

          { !!show.credits.crew.length && (
            <MediaDetailSection sectionTitle={ 'Crews' }>
              <MediaDetailHorizontalList items={ show.credits.crew } imageProp={ 'profile_path' }>
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

          { !!show.production_companies.length && (
            <MediaDetailSection sectionTitle={ 'Companies' }>
              <MediaDetailHorizontalList items={ show.production_companies } imageProp={ 'logo_path' } height={ 100 }>
                { item => (
                  <Text style={ { fontSize: 10, textAlign: 'center' } }>{ item.name }</Text>
                ) }
              </MediaDetailHorizontalList>
            </MediaDetailSection>
          ) }

          <MediaDetailSection sectionTitle={ 'Galleries' } containerStyle={ { marginBottom: 10 } }>
            <FlatList data={ show.images.backdrops }
                      keyExtractor={ (item, index) => item.file_path + index }
                      numColumns={ 2 }
                      renderItem={ info => (
                        <Image source={ { uri: info.item.file_path } }
                               style={ { width: (dimensions.width - 20) / 2, height: (dimensions.width - 20) / 2 } }
                               PlaceholderContent={ <Spinner isVisible={ true }
                                                             color={ colors.primary }
                                                             type={ 'FadingCircle' }
                               /> }
                        />
                      ) }
            />
          </MediaDetailSection>

          { !!show.recommendations.results.length && (
            <MediaDetailSection sectionTitle={ 'Recommendations' }>
              <MediaDetailHorizontalList items={ show.recommendations.results } imageProp={ 'poster_path' }
                                         wrapperStyle={ { paddingHorizontal: 0 } }
                                         onPress={ onRecommendationPress }>
                { item => (
                  <MediaTitleWithRating rating={ item.vote_average } count={ item.vote_count } title={ item.name }/>
                ) }
              </MediaDetailHorizontalList>
            </MediaDetailSection>
          ) }
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default ShowDetail;
