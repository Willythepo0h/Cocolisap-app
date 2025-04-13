import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const HelloWave = () => {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const wave = Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: -1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );

    wave.start();
  }, []);

  const rotate = waveAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-20deg", "20deg"],
  });

  return (
    <Animated.Text style={[styles.wave, { transform: [{ rotate }] }]}>
      👋
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  wave: {
    fontSize: 30,
    marginLeft: 5,
  },
});

export default HelloWave;
