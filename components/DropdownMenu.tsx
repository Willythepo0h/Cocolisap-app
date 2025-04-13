import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useThemeColor } from "@/functions/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type DropdownProps = {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
};

const DropDownMenu: React.FC<DropdownProps> = ({ selectedOption, setSelectedOption }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownAnim = useRef(new Animated.Value(0)).current;
    const borderColor = useThemeColor({ light: "#ccc" }, "tint");
    const iconColor = useThemeColor({}, "text");

    const toggleDropdown = () => {
        Animated.timing(dropdownAnim, {
            toValue: isDropdownVisible ? 0 : 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
        setDropdownVisible(!isDropdownVisible);
    };

    const options = ["Employee", "Non-Employee"];

    const handleSelect = (option: "Employee" | "Non-Employee") => {
        setSelectedOption(option);
        toggleDropdown();
    };

    const dropdownHeight = dropdownAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, options.length * 40],
    });

    return (
        <ThemedView style={styles.container}>
            <TouchableOpacity
                style={[styles.dropdownButton, { borderColor }]}
                onPress={toggleDropdown}
            >
                <Ionicons name={selectedOption === "Employee" ? "person" : "person-outline"} size={20} color={iconColor} />
                <ThemedText style={styles.selectedText}>{selectedOption}</ThemedText>
                {isDropdownVisible ? (
                    <Ionicons name="chevron-up-outline" size={20} color={iconColor} style={styles.arrowIcon} />
                ) : (
                    <Ionicons name="chevron-down-outline" size={20} color={iconColor} style={styles.arrowIcon} />
                )}
            </TouchableOpacity>

            <Animated.View style={[styles.dropdownContainer, { height: dropdownHeight, opacity: dropdownAnim, borderColor }]}>
                {isDropdownVisible &&
                    options.map((option) => (
                        <TouchableOpacity key={option} style={styles.option} onPress={() => handleSelect(option as "Employee" | "Non-Employee")}>
                            <Ionicons
                                name={option === "Employee" ? "person" : "person-outline"}
                                size={20}
                                color={iconColor}
                                style={styles.icon}
                            />
                            <ThemedText style={styles.optionText}>{option}</ThemedText>
                        </TouchableOpacity>
                    ))}
            </Animated.View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: { alignItems: 'center' },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        padding: 5
    },
    selectedText: { fontSize: 16, marginLeft: 10 },
    arrowIcon: { marginLeft: 10 },
    dropdownContainer: { overflow: 'hidden', borderRadius: 10, borderWidth: 1, marginTop: 2 },
    option: { flexDirection: 'row', alignItems: 'center', width: '100%', padding: 5 },
    icon: { marginRight: 10 },
    optionText: { fontSize: 16 }
});

export default DropDownMenu;