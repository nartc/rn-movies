import { useRef } from 'react';
import { Animated } from 'react-native';

export const useDetailAnimations = () => {
  const scrollYRef = useRef(new Animated.Value(0));

  const animatedImageHeight = scrollYRef.current.interpolate({
    inputRange: [0, 30],
    outputRange: [555, 80],
    extrapolate: 'clamp'
  });

  const animatedImageOpacity = animatedImageHeight.interpolate({
    inputRange: [80, 555],
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

  return {
    scrollYRef,
    animatedTitle,
    animatedHeaderOpacity,
    animatedImageOpacity,
    animatedImageTranslateY,
    animatedImageHeight
  };
};
