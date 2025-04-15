import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type Props = {
  onFilterChange: (query: string) => void;
};

export default function TableFilter({ onFilterChange }: Props) {
  const [query, setQuery] = useState("");

  const handleChange = (text: string) => {
    setQuery(text);
    onFilterChange(text);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="default">Filter by classification:</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="e.g., Healthy, Moderate..."
        value={query}
        onChangeText={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
  },
});
