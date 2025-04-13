import Animated, { 
  useAnimatedStyle, 
  interpolateColor, 
  useSharedValue, 
  withTiming
} from "react-native-reanimated";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  "employee-tabs": undefined; 
};

type EmployeeTabsNavigationProp = StackNavigationProp<RootStackParamList>; 

interface DeleteButtonProps {
  setDisplayedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ setDisplayedImage }) => {
  const navigation = useNavigation<EmployeeTabsNavigationProp>();
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ["rgb(20, 20, 20)", "rgb(255, 69, 69)"]),
  }));

  const handleDiscard = () => {
    progress.value = withTiming(1, { duration: 100 });

    Alert.alert(
      "Discard Image",
      "Are you sure you want to discard this image?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            setTimeout(() => {
              progress.value = withTiming(0, { duration: 100 });
            }, 100); 
          },
        },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => {
            setDisplayedImage(null);
            navigation.reset({
              index: 0, 
              routes: [{ name: "employee-tabs" }],
            });

            setTimeout(() => {
              progress.value = withTiming(0, { duration: 100 })
            }, 100);
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleDiscard} activeOpacity={0.8} style={{ paddingHorizontal: 20}}>
      <Animated.View
        style={[
          {
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          },
          animatedStyle,
        ]}
      >
        <Ionicons name="trash" size={24} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DeleteButton;
