import { useRouter } from "expo-router";
import { getLocalApiUrl } from "@/functions/getLocalIP";
import ExportCSVButton from "@/components/ExportButton";
import { useThemeColor } from "@/functions/useThemeColor";
import React, { useState, useRef, useEffect } from "react";
import { Animated, ScrollView, Alert, Linking, StyleSheet } from "react-native";

import HelloWave from "@/components/HelloWave";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import AutoScrollCards from "@/components/AutoScrollCards";
import TableComponent from "@/components/TableComponent";
import ParallaxHeader from "@/components/ParallaxScrollView";

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

export default function NonEmployeeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState<CocolisapEntry[]>([]);
  const borderColor = useThemeColor({ light: "#ccc" }, "tint");

  const handleCardPress = async (type: string) => {
    switch (type) {
      case "info":
        router.push("/nonemployee-tabs/cocolisapInfo");
        break;
      case "manage":
        router.push("/nonemployee-tabs/cocolisapManagement");
        break;
      case "pca":
        const url = "https://pca.gov.ph/index.php";
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          Alert.alert(
            "Leaving App",
            "You are about to leave the app and be redirected to an external website. Do you want to continue?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Yes, Continue",
                onPress: async () => {
                  await Linking.openURL(url);
                },
              },
            ]
          );
        } else {
          Alert.alert("Error", "Cannot open this URL");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = await getLocalApiUrl(8000, "FAST_API_URL");
        const res = await fetch(`${API_URL}/dashboard/summary`);
        if (!res.ok) throw new Error("Network error");

        const json = await res.json();
        const history = json?.cocolisap_history || [];
        setData(history);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ParallaxHeader
        scrollY={scrollY}
        imageSource={require("../../assets/images/Parallax-icon.png")}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedText type="defaultSemiBold">Cocolisap Detection History</ThemedText>

        <ExportCSVButton data={data} />

        <ThemedView style={[styles.tableWrapper, { borderColor }]}>
          <TableComponent data={data}/>
        </ThemedView>

        <AutoScrollCards onCardPress={handleCardPress} />

      </ScrollView>
    </ThemedView>
  );
};

const sharedStyles = {
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  borderStyle: { borderWidth: 1 }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tableWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
    ...sharedStyles.borderStyle,
  }
});
