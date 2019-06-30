import { colors } from '@styles/Colors';
import { AnimatedComponent, Merge } from '@utils/types';
import React, { FC, memo } from 'react';
import { Animated, ImageStyle, Platform, StyleProp, StyleSheet, View } from 'react-native';
import { Icon, Image, ImageProps, Text } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({
  imagePlaceholder: {
    backgroundColor: colors.default
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: 'auto',
    height: 555,
    zIndex: 3
  },
  headerWrapper: {
    height: 555,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3
  },
  headerBar: {
    backgroundColor: colors.default,
    height: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.light,
    zIndex: 2
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

const AnimatedImage = Animated.createAnimatedComponent(Image) as AnimatedComponent<ImageProps, {
  style: StyleProp<Merge<ImageStyle, { opacity: Animated.AnimatedInterpolation, transform?: { translateY: Animated.AnimatedInterpolation }[] }>>
}>;

type MediaDetailHeaderProps = {
  animatedImageOpacity: Animated.AnimatedInterpolation;
  animatedHeaderOpacity: Animated.AnimatedInterpolation;
  animatedTitle: Animated.AnimatedInterpolation;
  headerTranslate: Animated.AnimatedInterpolation;
  headerText: string;
  headerImage: string;
  onPop: () => void;
};
const MediaDetailHeader: FC<MediaDetailHeaderProps> = memo((
  {
    animatedTitle,
    animatedHeaderOpacity,
    animatedImageOpacity,
    headerTranslate,
    headerText,
    headerImage,
    onPop
  }) => {
  return (
    <>
      <Animated.View style={ { ...styles.headerWrapper, transform: [{ translateY: headerTranslate }] } }>
        <AnimatedImage resizeMode={ 'cover' }
                       ImageComponent={ FastImage }
                       style={ {
                         ...styles.image,
                         opacity: animatedImageOpacity
                       } }
                       source={ { uri: headerImage } }
                       placeholderStyle={ styles.imagePlaceholder }
                       PlaceholderContent={ <Spinner
                         isVisible={ true }
                         type={ Platform.OS === 'ios' ? 'Wave' : '9CubeGrid' }
                         size={ 20 }
                         color={ colors.primary }
                       /> }/>
      </Animated.View>
      <Animated.View style={ { ...styles.headerBar, opacity: animatedHeaderOpacity } }>
        <Animated.View style={ {
          ...styles.headerTextWrapper,
          opacity: animatedHeaderOpacity,
          transform: [{ translateY: animatedTitle }]
        } }>
          <Text h4 h4Style={ styles.headerText }>{ headerText }</Text>
          <Icon name={ 'keyboard-backspace' }
                color={ colors.secondary }
                onPress={ onPop }/>
        </Animated.View>
      </Animated.View>
    </>
  );
});

export default MediaDetailHeader;
