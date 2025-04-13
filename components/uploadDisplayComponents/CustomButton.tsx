import React, { useRef } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Text,
} from "react-native";

interface CustomButtonProps {
  onPress?: () => void;
  text: string;
  disabled?: boolean;
  borderColorStart?: string;
  borderColorEnd?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  text,
  disabled = false,
  borderColorStart = "black",
  borderColorEnd = "green",
}) => {
  const borderColor = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (disabled) return;

    Animated.sequence([
      Animated.timing(borderColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(borderColor, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();

    if (onPress) {
      onPress();
    }
  };

  const interpolatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [borderColorStart, borderColorEnd],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
      <Animated.View style={[styles.button, { borderColor: interpolatedBorderColor }]}>
        <Text style={[styles.text, { color: disabled ? "gray" : "black" }]}>{text}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "30%",
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: { color: "black", fontSize: 16, fontWeight: "bold", letterSpacing: 2 },
});

export default CustomButton;