import { useFetch } from '@hooks/useFetch';
import { PersonalScreenProps } from '@screens/Personal/PersonalScreen';
import { AnimatedComponent, StackScreenComponent } from '@utils/types';
import React, { useEffect, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Avatar, Divider, ListItem, Button } from 'react-native-elements';
import { colors } from '@styles/Colors';
import { ProgressCircle, ProgressCircleProps } from 'react-native-svg-charts';

const AnimatedProgressCircle =
  Animated.createAnimatedComponent(ProgressCircle) as AnimatedComponent<ProgressCircleProps, { progress: Animated.Value }>;

const Personal: StackScreenComponent<PersonalScreenProps> = (
  {
    isLoading,
    account,
    averageMoviesRating,
    navigation,
    getAccountMovies,
    getAccountShows,
    getAverageMoviesRating
  }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useFetch(getAverageMoviesRating);

  useEffect(() => {
    Animated.timing(progress, { toValue: averageMoviesRating / 10, duration: 1000 }).start();
  }, [averageMoviesRating]);

  return (
    <SafeAreaView style={ { flex: 1 } }>
      <ScrollView style={ { flex: 1, paddingHorizontal: 10 } }>

        <View style={ { alignItems: 'center', marginBottom: 10 } }>
          <Avatar source={ { uri: account.avatar_url } }
                  rounded
                  size={ 'xlarge' }
                  containerStyle={ { borderWidth: 5, borderColor: colors.secondary } }/>
          <Text h3 h3Style={ { color: colors.secondary } }>{ account.name || account.username }</Text>
        </View>

        <View>
          <Text h4 h4Style={ { color: colors.secondary } }>Statistics</Text>
          <Divider style={ { backgroundColor: colors.light } }/>
          <View style={ { flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 5 } }>
            <View style={ { flex: 1 } }>
              <AnimatedProgressCircle progress={ progress }
                                      progressColor={ colors.primary }
                                      style={ { height: 75, flex: 1 } }
                                      strokeWidth={ 2 }/>
              <View style={ {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center'
              } }>
                <Text h4 h4Style={ { color: colors.secondary, fontWeight: 'bold' } }>
                  { averageMoviesRating.toFixed(1) }/10
                </Text>
              </View>
            </View>
            <View style={ { width: 0.5, backgroundColor: colors.light } }/>
            <View style={ { flex: 1 } }>
              <AnimatedProgressCircle progress={ progress }
                                      progressColor={ colors.primary }
                                      style={ { height: 75, flex: 1 } }
                                      strokeWidth={ 2 }/>
              <View style={ {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center'
              } }>
                <Text h4 h4Style={ { color: colors.secondary, fontWeight: 'bold' } }>
                  { averageMoviesRating.toFixed(1) }/10
                </Text>
              </View>
            </View>
          </View>
          <View style={ { flex: 1, flexDirection: 'row' } }>
            <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
              <Text style={ { fontSize: 12 } }>Avg. TV Score</Text>
            </View>
            <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
              <Text style={ { fontSize: 12 } }>Avg. Movie Score</Text>
            </View>
          </View>
        </View>

        <View style={ { marginVertical: 10 } }>
          <ListItem containerStyle={ { backgroundColor: colors.default } }
                    bottomDivider
                    topDivider
                    leftIcon={ {
                      name: 'television',
                      type: 'material-community',
                      iconStyle: { color: colors.secondary }
                    } }
                    chevron
                    title={ 'Watchlist' }
                    titleStyle={ { fontSize: 14 } }
                    subtitle={ '0 items' }
                    subtitleStyle={ { color: colors.light, fontSize: 12 } }/>
          <ListItem containerStyle={ { backgroundColor: colors.default } }
                    bottomDivider
                    topDivider
                    leftIcon={ {
                      name: 'heart-outline',
                      type: 'material-community',
                      iconStyle: { color: colors.secondary }
                    } }
                    chevron
                    title={ 'Favorites' }
                    titleStyle={ { fontSize: 14 } }
                    subtitle={ '0 items' }
                    subtitleStyle={ { color: colors.light, fontSize: 12 } }/>
          <ListItem containerStyle={ { backgroundColor: colors.default } }
                    bottomDivider
                    topDivider
                    leftIcon={ { name: 'star', type: 'material-community', iconStyle: { color: colors.secondary } } }
                    chevron
                    title={ 'Ratings' }
                    titleStyle={ { fontSize: 14 } }
                    subtitle={ '0 items' }
                    subtitleStyle={ { color: colors.light, fontSize: 12 } }/>
        </View>

        <View style={ { marginVertical: 10 } }>
          <View style={ { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' } }>
            <Text h4 h4Style={ { color: colors.secondary } }>Playlist</Text>
            <Button type={ 'clear' }
                    title={ 'New playlist' }
                    buttonStyle={ { backgroundColor: colors.default, paddingBottom: 0 } }
                    titleStyle={ { color: colors.primary } }
                    icon={ { name: 'playlist-plus', type: 'material-community', color: colors.primary } }
                    onPress={ () => {
                    } }/>
          </View>
          <Divider style={ { backgroundColor: colors.light } }/>
          <Text style={ { alignSelf: 'center', marginVertical: 10 } }>No playlist</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Personal;
