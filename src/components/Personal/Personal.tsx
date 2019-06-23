import { useFetch } from '@hooks/useFetch';
import { PersonalScreenProps } from '@screens/Personal/PersonalScreen';
import { dimensions } from '@styles/Dimensions';
import { AnimatedComponent, StackScreenComponent } from '@utils/types';
import React, { useEffect, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Avatar, Divider } from 'react-native-elements';
import { colors } from '@styles/Colors';
import { ProgressCircle, ProgressCircleProps, Grid } from 'react-native-svg-charts';

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

        <View style={ { alignItems: 'center', width: dimensions.width, marginBottom: 10 } }>
          <Avatar source={ { uri: account.avatar_url } }
                  rounded
                  size={ 'large' }
                  containerStyle={ { borderWidth: 5, borderColor: colors.secondary } }/>
          <Text h3 h3Style={ { color: colors.secondary } }>{ account.name || account.username }</Text>
        </View>

        <View style={ { flex: 1 } }>
          <Text h4 h4Style={ { color: colors.secondary } }>Statistics</Text>
          <Divider style={ { backgroundColor: colors.light } }/>
          <View style={ { flex: 1, flexDirection: 'row' } }>
            <AnimatedProgressCircle progress={ progress }
                                    progressColor={ colors.primary }
                                    style={ { height: 100, flex: 1 } }
                                    strokeWidth={ 2 }>
              <Grid/>
            </AnimatedProgressCircle>
            <AnimatedProgressCircle progress={ progress }
                                    progressColor={ colors.primary }
                                    style={ { height: 100, flex: 1 } }
                                    strokeWidth={ 2 }>
              <Text>test</Text>
            </AnimatedProgressCircle>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Personal;
