import React from 'react';
import { ThemedText } from './ThemedText';
import { ScrollView, View, StyleSheet } from 'react-native';

const COLUMN_HEADERS = [
    'Timestamp', 'Avg Cocolisap Detected', 'Cocolisap Detected', 'Classification',
    'Latitude', 'Longitude', 'City', 'Region', 'Country'
];

type CocolisapEntry = {
    timestamp: string;
    value: number;
    num_detections: number;
    classification: string;
    latitude: number;
    longitude: number;
    city: string;
    region: string;
    country: string;
};

type TableComponentProps = {
    data: CocolisapEntry[];
  };
  

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {

    if (data.length === 0) {
        return (
            <View style={{ padding: 20 }}>
                <ThemedText style={{ textAlign: 'center' }}>No Data</ThemedText>
            </View>
        );
    }

    return (
        <ScrollView horizontal>
            <View>
                <View style={styles.headerRow}>
                    {COLUMN_HEADERS.map((header, idx) => (
                        <ThemedText key={idx} style={styles.headerCell}>{header}</ThemedText>
                    ))}
                </View>

                <ScrollView style={styles.scrollContainer} nestedScrollEnabled={true}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <ThemedText style={styles.cell}>{item.timestamp}</ThemedText>
                            <ThemedText style={styles.cell}>{item.value}</ThemedText>
                            <ThemedText style={styles.cell}>{item.num_detections}</ThemedText>
                            <ThemedText style={styles.cell}>{item.classification}</ThemedText>
                            <ThemedText style={styles.cell}>{item.latitude}</ThemedText>
                            <ThemedText style={styles.cell}>{item.longitude}</ThemedText>
                            <ThemedText style={styles.cell}>{item.city}</ThemedText>
                            <ThemedText style={styles.cell}>{item.region}</ThemedText>
                            <ThemedText style={styles.cell}>{item.country}</ThemedText>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    headerRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc'},
    headerCell: {
        padding: 10,
        fontWeight: 'bold',
        width: 150,
        borderRightWidth: 1,
        borderColor: '#eee'
    },
    row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee' },
    cell: { padding: 10, width: 150, borderRightWidth: 1, borderColor: '#eee' },
    scrollContainer: { maxHeight: 400, flexShrink: 1 },
});

export default TableComponent;