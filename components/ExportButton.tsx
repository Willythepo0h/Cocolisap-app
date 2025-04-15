import React from 'react';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/functions/useThemeColor';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { exportToCSV } from '@/functions/exportData'; 

const COLUMN_HEADERS = [
  'Timestamp', 'Avg Cocolisap Detected', 'Cocolisap Detected', 'Classification',
  'Latitude', 'Longitude', 'City', 'Region', 'Country'
];

type ExportButtonProps = {
  data: any[];
};

const ExportCSVButton: React.FC<ExportButtonProps> = ({ data }) => {
  const borderColor = useThemeColor({ light: "#ccc", dark: "white" }, "tint");
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={() => exportToCSV(data, COLUMN_HEADERS)} style={[styles.button, {borderColor}]}> 
        <ThemedText type='default'> Export to CSV </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 5, alignItems: 'center', alignSelf: 'flex-end' },
  button: { borderWidth: 1, borderRadius: 10, padding: 2}
});

export default ExportCSVButton;
