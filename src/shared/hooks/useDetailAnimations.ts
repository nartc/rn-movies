import { useRef } from 'react';
import { Animated } from 'react-native';

export const useDetailAnimations = () => {
  const scrollYRef = useRef(new Animated.Value(0));

  const headerTranslate = scrollYRef.current.interpolate({
    inputRange: [0, 555 - 80],
    outputRange: [0, 80 - 555],
    extrapolate: 'clamp'
  });

  const animatedImageOpacity = scrollYRef.current.interpolate({
    inputRange: [0, 555 - 90, 555 - 50],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp'
  });

  const animatedHeaderOpacity = scrollYRef.current.interpolate({
    inputRange: [555 - 90, 555 - 80],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const animatedTitle = scrollYRef.current.interpolate({
    inputRange: [555 - 90, 555 - 35],
    outputRange: [75, 15],
    extrapolate: 'clamp'
  });

  return {
    scrollYRef,
    animatedTitle,
    animatedHeaderOpacity,
    animatedImageOpacity,
    headerTranslate
  };
};
