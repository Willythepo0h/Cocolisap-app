import React from "react";
import { ThemedText } from "./ThemedText";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  "employee-tabs": undefined; 
};

type EmployeeTabsNavigationProp = StackNavigationProp<RootStackParamList>; 

const BackButton: React.FC = () => {
	const navigation = useNavigation<EmployeeTabsNavigationProp>();

	const handleBack = () => {
		navigation.reset({
      index: 0, 
      routes: [{ name: "employee-tabs" }],
    });
	};

	return (
		<TouchableOpacity onPress={handleBack} style={styles.backButton}>
			<ThemedText style={styles.buttonText}>Back</ThemedText>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	backButton: {
		width: "30%",
		borderWidth: 1,
		paddingVertical: 10,
		alignItems: "center",
		position: "relative",
		justifyContent: "center",
		backgroundColor: "white",
	},
	buttonText: { color: "black", fontSize: 16, fontWeight: "bold", letterSpacing: 2 },
});

export default BackButton;