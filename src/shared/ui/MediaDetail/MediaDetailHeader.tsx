import { colors } from '@styles/Colors';
import React, { FC, memo } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({
  imagePlaceholder: {
    backgroundColor: colors.default
  },
  image: {
    height: 555
  },
  headerWrapper: {
    height: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomColor: colors.light,
    borderBottomWidth: 0.5,
  },
  headerTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: colors.secondary
  }
});

type MediaDetailHeaderProps = {
  animatedImageHeight: Animated.AnimatedInterpolation;
  animatedImageTranslateY: Animated.AnimatedInterpolation;
  animatedImageOpacity: Animated.AnimatedInterpolation;
  animatedHeaderOpacity: Animated.AnimatedInterpolation;
  animatedTitle: Animated.AnimatedInterpolation;
  headerText: string;
  headerImage: string;
  onPop: () => void;
};
const MediaDetailHeader: FC<MediaDetailHeaderProps> = memo((
  {
    animatedTitle,
    animatedHeaderOpacity,
    animatedImageOpacity,
    animatedImageTranslateY,
    animatedImageHeight,
    headerText,
    headerImage,
    onPop
  }) => {
  return (
    <>
      <Animated.View style={ {
        height: animatedImageHeight,
        opacity: animatedImageOpacity,
        transform: [{ translateY: animatedImageTranslateY }]
      } }>
        <Image source={ { uri: headerImage } }
               placeholderStyle={ styles.imagePlaceholder }
               style={ styles.image }
               PlaceholderContent={ <Spinner
                 isVisible={ true }
                 type={ Platform.OS === 'ios' ? 'Wave' : '9CubeGrid' }
                 size={ 20 }
                 color={ colors.primary }
               /> }
        />
      </Animated.View>
      <Animated.View style={ {
        ...styles.headerWrapper,
        opacity: animatedHeaderOpacity
      } }>
        <Animated.View style={ {
          ...styles.headerTextWrapper,
          opacity: animatedHeaderOpacity,
          transform: [{ translateY: animatedTitle }]
        } }>
          <Text h4 h4Style={ styles.headerText }>{ headerText }</Text>
          <Icon name={ 'keyboard-backspace' }
                type={ 'material-community' }
                color={ colors.secondary }
                onPress={ onPop }/>
        </Animated.View>
      </Animated.View>
    </>
  );
});

export default MediaDetailHeader;
