import { TouchableOpacity, 
	TextInput, 
	Alert, 
	StyleSheet, 
	ActivityIndicator, 
	useColorScheme } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ROLES } from "@/constants/roles";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import DropDownMenu from "@/components/DropdownMenu"; 

export default function AdminLogin() {
	const [error, setError] = useState("");
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [selectedOption, setSelectedOption] = useState("Employee");

	const { login } = useAuth();
	const router = useRouter();

	const theme = useColorScheme();
	const isDarkMode = theme === "dark";

	const colors = {
		text: isDarkMode ? "white" : "black",
		border: isDarkMode ? "white" : "#ccc",
		placeholder: isDarkMode ? "#888" : "#666",
		icon: isDarkMode ? "white" : "black",
	};

	const validateEmail = (email: string) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const handleLogin = async () => {
		setError("");

		if (selectedOption === "Employee") {
			if (!email || !password) {
				setError("Please enter both email and password.");
				setTimeout(() => setError(""), 3000);
				return;
			}

			if (!validateEmail(email)) {
				setError("Invalid email format.");
				setTimeout(() => setError(""), 3000);
				return;
			}

			setLoading(true);
			const success = await login(email, password);
			setLoading(false);

			if (success) {
				router.push('/employee-tabs');
			} else {
				Alert.alert("Login Failed", "Invalid credentials");
			}
		} else {
			setEmail("");
			setPassword("");
			router.push('/nonemployee-tabs');
		}
	}

	return (
		<ThemedView style={styles.container}>
			<ThemedText type="title" style={styles.title}>Admin Login</ThemedText>

			<ThemedView style={styles.dropdown}>
				<DropDownMenu selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
			</ThemedView>

			{selectedOption === ROLES.EMPLOYEE && (
				<>
					<ThemedView style={[styles.inputContainer, { borderColor: colors.border }]}>
						<TextInput
							style={styles.input}
							placeholderTextColor={colors.text}
							placeholder="email@domain.com"
							keyboardType="email-address"
							autoCapitalize="none"
							value={email}
							onChangeText={setEmail}
						/>
						<Ionicons name="mail-outline" size={20} style={styles.icon} color={colors.icon} />
					</ThemedView>

					<ThemedView style={[styles.inputContainer, { borderColor: colors.border }]}>
						<TextInput
							style={styles.input}
							placeholderTextColor={colors.text}
							placeholder="password"
							secureTextEntry={!showPassword}
							value={password}
							onChangeText={setPassword}
						/>
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
							<Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} 
								size={20} style={styles.icon} color={colors.icon} />
						</TouchableOpacity>
					</ThemedView>
				</>
			)}

			{error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

			<TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
				{loading ? (
					<ActivityIndicator color="white" />
				) : (
					<ThemedText style={styles.buttonText}>Continue</ThemedText>
				)}
			</TouchableOpacity>

			<ThemedText style={styles.note}>
				Note: <ThemedText style={styles.boldText}>Authorized Personnel</ThemedText> Only
			</ThemedText>
		</ThemedView>
	)
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', padding: 20 },
	title: { textAlign: "center", marginBottom: 20 },
	dropdown: { marginBottom: 10 },
	inputContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 10, marginBottom: 10 },
	input: { flex: 1, padding: 10 },
	icon: { padding: 10 },
	button: { backgroundColor: "black", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 10 },
	buttonText: { color: "white", fontWeight: "bold" },
	error: { color: "red", textAlign: "center" },
	note: { marginTop: 10, textAlign: "center" },
	boldText: { fontWeight: "bold", textDecorationLine: "underline" },
});
