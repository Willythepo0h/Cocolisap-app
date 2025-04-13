import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet
} from "react-native";
import React, { useRef } from "react";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/functions/useThemeColor";

const UploadButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const textOpacity = useRef(new Animated.Value(1)).current; 
  const iconY = useRef(new Animated.Value(0)).current; 
  const iconX = useRef(new Animated.Value(0)).current;

  const borderColor = useThemeColor({light: "#ccc"}, "tint");
  const iconColor = useThemeColor({}, "text");

  const handlePress = () => {
    Animated.sequence([
        Animated.timing(textOpacity, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(iconY, {
            toValue: 10,
            duration: 500,
            useNativeDriver: true
        }),
        Animated.timing(iconY, {
            toValue: -100,
            duration: 100,
            useNativeDriver: true
        }),
    ]).start(() => {
        Animated.sequence([
            Animated.timing(iconY, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }),    
            Animated.timing(iconX, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
        ]).start();
    });

    if (onPress) {
      setTimeout(onPress, 800); 
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.button, {borderColor}]}>
        <Animated.View style={{ opacity: textOpacity }}>
          <ThemedText type="default">Upload</ThemedText>
        </Animated.View>
        <Animated.View style={[styles.iconContainer, { transform: [{ translateY: iconY}, {translateX: iconX}] }]}>
          <Ionicons name="cloud-upload-outline" size={28} color={iconColor} />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '20%',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "rgba(180, 160, 255, 0.4)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    overflow: "hidden",
  },
  iconContainer: { justifyContent: "center", alignItems: "center" }
});

export default UploadButton;
