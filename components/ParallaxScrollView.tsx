import React from "react";
import { Animated, StyleSheet, ImageSourcePropType } from "react-native";

export const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 100;

interface ParallaxHeaderProps {
  scrollY: Animated.Value; 
  imageSource: ImageSourcePropType;
}

const ParallaxHeader: React.FC<ParallaxHeaderProps> = ({ scrollY, imageSource }) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const imageScale = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT],
    outputRange: [1, 1.2, 1.5],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.Image
        source={imageSource}
        accessibilityLabel="Header icon"
        style={[
          styles.image,
          { transform: [{ translateY: imageTranslate }, { scale: imageScale }] },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  image: { width: "100%", height: HEADER_MAX_HEIGHT },
});

export default ParallaxHeader;
