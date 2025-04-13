import { useEffect, useState, useMemo } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getLocalApiUrl } from "@/functions/getLocalIP";
import LineChartComponent from "@/components/dashboardComponents/LineChartComponent";
import PieChartComponent from "@/components/dashboardComponents/PieChartComponent";

interface AvgEntry {
  value: number;
  timestamp: string;
}

export default function EmployeeDashboardScreen() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [totalCocolisap, setTotalCocolisap] = useState<number | null>(null);
  const [totalImages, setTotalImages] = useState<number | null>(null);
  const [avgCocolisap, setAvgCocolisap] = useState<number | null>(null);
  const [avgCocolisapHistory, setAvgCocolisapHistory] = useState<AvgEntry[]>([]);
  const [classificationCounts, setClassificationCounts] = useState({
    Healthy: 0,
    Slight: 0,
    Moderate: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const API_URL = await getLocalApiUrl(8000, "FAST_API_URL");

      const res = await fetch(`${API_URL}/dashboard/summary`);
      if (!res.ok) throw new Error("Network error");

      const data = await res.json();

      setTotalCocolisap(data.total_cocolisap);
      setTotalImages(data.total_processed_images);
      setAvgCocolisap(data.average_cocolisap);
      setAvgCocolisapHistory(data.cocolisap_history);
      setClassificationCounts({
        Healthy: data.classification_counts?.Healthy,
        Slight: data.classification_counts?.Slight,
        Moderate: data.classification_counts?.Moderate
      });
    } catch (err) {
      console.error("Failed to fetch summary", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const { pieData, legendItems } = useMemo(() => {
    const entries = Object.entries(classificationCounts);
    const total = entries.reduce((sum, [, count]) => sum + count, 0);

    const colorMap: Record<string, string> = {
      Healthy: "#2EB62C",
      Slight: "#FFD400",
      Moderate: "#FF6200",
    };

    const gradientMap: Record<string, string> = {
      Healthy: "#FFFFFF",
      Slight: "#FFFFFF",
      Moderate: "#FFFFFF",
    };

    const pieData = entries.map(([label, count], index) => ({
      value: total > 0 ? parseFloat(((count / total) * 100).toFixed(2)) : 0,
      color: colorMap[label],
      gradientCenterColor: gradientMap[label],
    }));

    const legendItems = entries.map(([label, count]) => ({
      label: `${label}: ${total > 0 ? ((count / total) * 100).toFixed(2) : 0}%`,
      color: colorMap[label],
    }));

    return { pieData, legendItems };
  }, [classificationCounts]);

  const hasData = pieData.some(item => item.value > 0);

  const displayPieData = hasData
    ? pieData
    : [{
      value: 100,
      color: '#ccc',
      gradientCenterColor: '#aaa',
      focused: true,
    }]

  const displayLegendItems = hasData
    ? legendItems
    : [{ label: 'No data', color: '#aaa' }];

  const centerValue = hasData ? `${pieData[focusedIndex]?.value}%` : '';
  const centerLabel = hasData ? legendItems[focusedIndex]?.label.split(':')[0] : 'No Data Available';

  const lineChartData = useMemo(() => {
    return avgCocolisapHistory.map((value, index) => ({
      value,
      dataPointText: `${value}`,
      label: `${index + 1}`
    }));
  }, [avgCocolisapHistory]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.topSection}>
          <ScrollView horizontal style={styles.scrollContainer}>
            <ThemedView style={styles.metricContainer}>
              <ThemedText type="defaultSemiBold" style={{ paddingBottom: 10 }}>Total Images Processed:</ThemedText>
              <ThemedText type="title">{totalImages ?? "Loading..."}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.metricContainer}>
              <ThemedText type="defaultSemiBold" style={{ paddingBottom: 10 }}>Total Cocolisap Detected:</ThemedText>
              <ThemedText type="title">{totalCocolisap ?? "Loading..."}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.metricContainer}>
              <ThemedText type="defaultSemiBold" style={{ paddingBottom: 10 }}>Healthy Classification:</ThemedText>
              <ThemedText type="title">{classificationCounts.Healthy ?? "Loading..."}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.metricContainer}>
              <ThemedText type="defaultSemiBold" style={{ paddingBottom: 10 }}>Slight Classification:</ThemedText>
              <ThemedText type="title">{classificationCounts.Slight ?? "Loading..."}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.metricContainer}>
              <ThemedText type="defaultSemiBold" style={{ paddingBottom: 10 }}>Moderate Classification:</ThemedText>
              <ThemedText type="title">{classificationCounts.Moderate ?? "Loading..."}</ThemedText>
            </ThemedView>

          </ScrollView>
        </ThemedView>

        <PieChartComponent
          title="Classification Distribution"
          pieData={displayPieData}
          legendItems={displayLegendItems}
          centerValue={centerValue}
          centerLabel={centerLabel}
        />

        {avgCocolisapHistory.length > 0 && (
          <ThemedView style={{ borderWidth: 1, borderRadius: 10, width: '100%', padding: 10, borderColor: "#ccc", overflow: 'hidden' }}>
            <ThemedText
              type="title"
              style={{ paddingBottom: 10 }}
            >
              Average Cocolisap per Run
            </ThemedText>
            <LineChartComponent averageValues={avgCocolisapHistory} minDataPoints={10} />
          </ThemedView>
        )}

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start", padding: 10 },
  topSection: { justifyContent: "center", alignItems: "center", width: "100%" },
  scrollContainer: { flexDirection: "row", width: '100%' },
  metricContainer: {
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    marginRight: 5
  },
});
