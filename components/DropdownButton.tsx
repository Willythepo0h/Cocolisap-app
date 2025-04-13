import React, { useState } from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/functions/useThemeColor';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const DropdownButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const translateY = useSharedValue(0);
  const imageOpacity = useSharedValue(0);

  const borderColor = useThemeColor({light: "#ccc"}, 'tint');

  const toggleDropdown = () => {
    if (isExpanded) {  
      translateY.value = withTiming(0, { duration: 1000 });
      imageOpacity.value = withTiming(0, { duration: 1000 });
    } else { 
      translateY.value = withTiming(1, { duration: 1000 });
      imageOpacity.value = withTiming(1, { duration: 500 });
    }
    setIsExpanded(!isExpanded);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const imageAnim = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[animatedStyle, { alignItems: 'center' }]}>
        {isExpanded && (
          <Animated.Image 
            source={require('../assets/images/Sample_Upload.jpg')}
            style={[styles.imageStyle, imageAnim]} 
          />
        )}

        <TouchableOpacity style={[styles.button, { borderColor }]} onPress={toggleDropdown}>
          <ThemedText style={styles.iconStyle}>{isExpanded ? "▲" : "▼"}</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageStyle: {
    resizeMode: 'stretch',
    width: '95%',
    height: 200
  },
  button: {
    overflow: 'hidden',
    height: 40,
    width: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  iconStyle: { fontSize: 25, textAlign: 'center' },
});

export default DropdownButton;
