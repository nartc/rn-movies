import { MovieVideoSite, MovieVideoType } from '@api/Models';
import { colors } from '@styles/Colors';
import { dimensions } from '@styles/Dimensions';
import CenterView from '@ui/CenterView';
import { StackScreenComponent } from '@utils/types';
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { Badge, Divider, Image, Text, Card, Icon } from 'react-native-elements';
import { MovieDetailModalScreenProps } from '@screens/Movies/MovieDetailModalScreen';
import Spinner from 'react-native-spinkit';
import StarRating from 'react-native-star-rating';
import numeral from 'numeral';

const MovieDetail: StackScreenComponent<MovieDetailModalScreenProps> = ({ movie, isLoading, id, fetchMovieById, navigation }) => {
  const scrollYRef = useRef(new Animated.Value(0));

  const animatedImageHeight = scrollYRef.current.interpolate({
    inputRange: [0, 35],
    outputRange: [555, 80],
    extrapolate: 'clamp'
  });

  const animatedImageOpacity = animatedImageHeight.interpolate({
    inputRange: [80, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const animatedImageTranslateY = animatedImageHeight.interpolate({
    inputRange: [80, 555],
    outputRange: [-555 + 80, 0],
    extrapolate: 'clamp'
  });

  const animatedHeaderOpacity = animatedImageOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const animatedTitle = animatedHeaderOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 20],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    fetchMovieById(id);
  }, [id]);

  const trailer = movie
    && movie.videos.results.find(v => v.site === MovieVideoSite.Youtube
      && (v.type === MovieVideoType.Trailer || v.type === MovieVideoType.Teaser));

  const onRecommendationPress = (id: number) => {
    navigation.replace('MovieDetails', { id });
  };

  return isLoading || !movie ? (
    <CenterView>
      <Spinner isVisible={ true } type={ 'ChasingDots' } size={ 24 } color={ colors.primary }/>
      <Text>Loading detail...</Text>
    </CenterView>
  ) : (
    <View style={ { flex: 1 } }>
      <Animated.View style={ {
        height: animatedImageHeight,
        opacity: animatedImageOpacity,
        transform: [{ translateY: animatedImageTranslateY }]
      } }>
        <Image source={ { uri: movie.images.posters[movie.images.posters.length - 1].file_path, height: 555 } }
               placeholderStyle={ { backgroundColor: colors.default } }
               PlaceholderContent={ <Spinner
                 isVisible={ true }
                 type={ Platform.OS === 'ios' ? 'Wave' : '9CubeGrid' }
                 size={ 20 }
                 color={ colors.primary }
               /> }
        />
      </Animated.View>
      <Animated.View style={ {
        height: 80,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderBottomColor: colors.light,
        borderBottomWidth: 0.5,
        opacity: animatedHeaderOpacity
      } }>
        <Animated.View style={ {
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: animatedHeaderOpacity,
          transform: [{ translateY: animatedTitle }]
        } }>
          <Text h4 h4Style={ { color: colors.secondary } }>{ movie.title }</Text>
          <Icon name={ 'keyboard-backspace' }
                type={ 'material-community' }
                color={ colors.secondary }
                onPress={ () => navigation.pop() }/>
        </Animated.View>
      </Animated.View>
      <ScrollView style={ { flex: 1 } }
                  scrollEventThrottle={ 16 }
                  onScroll={ Animated.event([{ nativeEvent: { contentOffset: { y: scrollYRef.current } } }]) }>
        <View style={ { flex: 1, paddingHorizontal: 10 } }>
          <View>
            <Text h4 h4Style={ { color: colors.secondary, paddingTop: 10 } }>{ movie.title }</Text>
            <Text style={ {
              fontSize: 12,
              fontWeight: 'bold',
              color: colors.light
            } }>{ (movie.genre_names as string[]).join(', ') }</Text>
            <Badge status={ 'error' }
                   value={ movie.status }
                   containerStyle={ { marginTop: 5 } }
                   badgeStyle={ { alignSelf: 'flex-start' } }/>
            <Text style={ { marginVertical: 15 } }>{ movie.overview }</Text>
          </View>

          <View style={ { flex: 1, marginBottom: 10 } }>
            <Text h4 h4Style={ { color: colors.secondary } }>More info</Text>
            <Divider style={ { backgroundColor: colors.secondary } }/>
            <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
              <View style={ {
                width: dimensions.width,
                paddingHorizontal: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              } }>
                <Text>Release on: </Text>
                <Text>{ movie.release_date }</Text>
              </View>
              <View style={ {
                width: dimensions.width,
                paddingHorizontal: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              } }>
                <Text>Runtime: </Text>
                <Text>{ movie.runtime } minutes</Text>
              </View>
              <View style={ {
                width: dimensions.width,
                paddingHorizontal: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              } }>
                <Text>Rating: </Text>
                <StarRating rating={ (movie.vote_average / 10) * 5 }
                            starSize={ 12 }
                            fullStarColor={ colors.primary }
                            disabled
                            containerStyle={ { justifyContent: 'flex-start' } }/>
              </View>
              <View style={ {
                width: dimensions.width,
                paddingHorizontal: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              } }>
                <Text>Vote count: </Text>
                <Text>{ movie.vote_count }</Text>
              </View>
              { !!movie.budget && (
                <View style={ {
                  width: dimensions.width,
                  paddingHorizontal: 60,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                } }>
                  <Text>Budget: </Text>
                  <Text>{ numeral(movie.budget).format('$0,0.00') }</Text>
                </View>
              ) }
            </View>
          </View>

          <View>
            <Text h4 h4Style={ { color: colors.secondary } }>Casts</Text>
            <Divider style={ { backgroundColor: colors.secondary } }/>
            <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
              { movie.credits.cast.map(c => (
                <Card key={ c.cast_id + ' ' + c.id }
                      image={ { uri: c.profile_path } }
                      imageStyle={ { height: 150, width: 100 } }
                      containerStyle={ {
                        width: 100,
                        borderWidth: 0,
                        backgroundColor: colors.default
                      } }>
                  <Text style={ { fontSize: 10, textAlign: 'center' } }>{ c.name }</Text>
                  <Text style={ { fontSize: 8, textAlign: 'center' } }>as</Text>
                  <Text style={ { fontSize: 10, textAlign: 'center' } }>{ c.character }</Text>
                </Card>
              )) }
            </ScrollView>
          </View>

          <View>
            <Text h4 h4Style={ { color: colors.secondary } }>Crews</Text>
            <Divider style={ { backgroundColor: colors.secondary } }/>
            <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
              { movie.credits.crew.map(c => (
                <Card key={ c.credit_id }
                      image={ { uri: c.profile_path } }
                      imageStyle={ { height: 150, width: 100 } }
                      containerStyle={ {
                        width: 100,
                        borderWidth: 0,
                        backgroundColor: colors.default
                      } }>
                  <Text style={ { fontSize: 10, textAlign: 'center' } }>{ c.name }</Text>
                  <Text style={ { fontSize: 8, textAlign: 'center' } }>as</Text>
                  <Text style={ { fontSize: 10, textAlign: 'center' } }>{ c.job }</Text>
                </Card>
              )) }
            </ScrollView>
          </View>

          <View>
            <Text h4 h4Style={ { color: colors.secondary } }>Companies</Text>
            <Divider style={ { backgroundColor: colors.secondary } }/>
            <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
              { movie.production_companies.map(pc => (
                <Card key={ pc.id }
                      image={ { uri: pc.logo_path } }
                      imageStyle={ { height: 100, width: 100 } }
                      containerStyle={ {
                        width: 100,
                        borderWidth: 0,
                        backgroundColor: colors.default
                      } }>
                  <Text style={ { fontSize: 10, textAlign: 'center' } }>{ pc.name }</Text>
                </Card>
              )) }
            </ScrollView>
          </View>

          <View style={ { marginBottom: 10 } }>
            <Text h4 h4Style={ { color: colors.secondary } }>Galleries</Text>
            <Divider style={ { backgroundColor: colors.secondary } }/>
            <FlatList data={ movie.images.backdrops }
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
          </View>

          { !!movie.recommendations.results.length && (
            <View>
              <Text h4 h4Style={ { color: colors.secondary } }>Recommendations</Text>
              <Divider style={ { backgroundColor: colors.secondary } }/>
              <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
                { movie.recommendations.results.map(r => (
                  <TouchableOpacity key={ r.id } onPress={ () => onRecommendationPress(r.id) }>
                    <Card image={ { uri: r.poster_path } }
                          imageStyle={ { width: 150, height: 200 } }
                          containerStyle={ { width: 150, borderWidth: 0, backgroundColor: colors.default } }
                          wrapperStyle={ { paddingHorizontal: 0 } }>
                      <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                        <StarRating rating={ (r.vote_average / 10) * 5 }
                                    starSize={ 12 }
                                    fullStarColor={ colors.primary }
                                    disabled
                                    containerStyle={ { justifyContent: 'flex-start' } }/>
                        <Text style={ {
                          color: colors.secondary,
                          marginLeft: 5,
                          fontSize: 12
                        } }>({ r.vote_count })</Text>
                      </View>
                      <Text style={ { color: colors.secondary } }>{ r.title }</Text>
                    </Card>
                  </TouchableOpacity>
                )) }
              </ScrollView>
            </View>
          ) }
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetail;
