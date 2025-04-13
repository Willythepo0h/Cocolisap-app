import { ThemedText } from './ThemedText';
import React, { useEffect, useState } from 'react';
import { getLocalApiUrl } from '@/functions/getLocalIP';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';

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

const TableComponent = () => {
    const [data, setData] = useState<CocolisapEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const API_URL = await getLocalApiUrl(8000, "FAST_API_URL");
            console.log(API_URL);
      
            const res = await fetch(`${API_URL}/dashboard/summary`);
            if (!res.ok) throw new Error("Network error");
      
            const json = await res.json();
            const history = json?.cocolisap_history || [];
      
            console.log("Fetched entries:", history.length);
            setData(history);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <ThemedText style={{ color: 'red' }}>Error: {error}</ThemedText>;
    }

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
        width: 120,
        borderRightWidth: 1,
        borderColor: '#eee'
    },
    row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee' },
    cell: { padding: 10, width: 120, borderRightWidth: 1, borderColor: '#eee' },
    scrollContainer: { maxHeight: 400, flexShrink: 1 },
});

export default TableComponent;