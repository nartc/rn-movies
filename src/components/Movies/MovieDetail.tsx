import { colors } from '@styles/Colors';
import CenterView from '@ui/CenterView';
import { StackScreenComponent } from '@utils/types';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { Badge, Divider, Image, Text } from 'react-native-elements';
import { MovieDetailModalScreenProps } from '@screens/Movies/MovieDetailModalScreen';
import Spinner from 'react-native-spinkit';
import StarRating from 'react-native-star-rating';

const MovieDetail: StackScreenComponent<MovieDetailModalScreenProps> = ({ movie, isLoading, id, fetchMovieById }) => {
  const scrollYRef = useRef(new Animated.Value(0));

  const animatedImageHeight = scrollYRef.current.interpolate({
    inputRange: [0, 25],
    outputRange: [500, 80],
    extrapolate: 'clamp'
  });

  const animatedImageOpacity = animatedImageHeight.interpolate({
    inputRange: [80, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const animatedImageTranslateY = animatedImageHeight.interpolate({
    inputRange: [80, 500],
    outputRange: [-500 + 80, 0],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    fetchMovieById(id);
  }, []);

  return isLoading || !movie ? (
    <CenterView>
      <Spinner isVisible={ true } type={ 'ChasingDots' } size={ 24 } color={ colors.primary }/>
      <Text>Loading detail...</Text>
    </CenterView>
  ) : (
    <SafeAreaView style={ { flex: 1 } }>
      <Animated.View style={ {
        height: animatedImageHeight,
        opacity: animatedImageOpacity,
        transform: [{ translateY: animatedImageTranslateY }]
      } }>
        <Image source={ { uri: movie.images.posters[movie.images.posters.length - 1].file_path } }
               placeholderStyle={ { backgroundColor: colors.default } }
               PlaceholderContent={ <Spinner
                 isVisible={ true }
                 type={ Platform.OS === 'ios' ? 'Wave' : '9CubeGrid' }
                 size={ 20 }
                 color={ colors.primary }
               /> }
               style={ { height: 500 } }
        />
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

          <View style={ { flex: 1 } }>
            <Text h4 h4Style={ { color: colors.secondary } }>More info</Text>
            <Divider style={ { backgroundColor: colors.secondary } }/>
            <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
              <View style={ { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } }>
                <Text>Rating: </Text>
                <StarRating rating={ (movie.vote_average / 10) * 5 }
                            starSize={ 12 }
                            fullStarColor={ colors.primary }
                            disabled
                            containerStyle={ { justifyContent: 'flex-start' } }/>
              </View>
              <View style={ { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } }>
                <Text>Vote count: </Text>
                <Text>{ movie.vote_count }</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetail;
