import { useRouter } from "expo-router";
import React, { useRef, useState, useEffect} from "react";
import { Animated, ScrollView, StyleSheet } from "react-native";

import HelloWave from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import UploadButton from "@/components/UploadButton";
import { getLocalApiUrl } from "@/functions/getLocalIP";
import ExportCSVButton from "@/components/ExportButton";
import TableComponent from "@/components/TableComponent";
import DropdownButton from "@/components/DropdownButton";
import { useThemeColor } from "@/functions/useThemeColor";
import { useImageUpload } from "@/functions/useImageUpload";
import ParallaxHeader, { HEADER_MAX_HEIGHT } from "@/components/ParallaxScrollView";

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

export default function EmployeeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CocolisapEntry[]>([]);
  const { pickedImage, uploadImage } = useImageUpload();
  const scrollY = useRef(new Animated.Value(0)).current;
  const borderColor = useThemeColor({ light: "#ccc" }, "tint");

  const handleUpload = async () => {
    const image = await uploadImage();

    if (image) {
      router.push({
        pathname: "/employee-tabs/uploadDisplay",
        params: { image: image.uri },
      });
    } else {
      return;
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
        scrollEventThrottle={10}
      >

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{ letterSpacing: 1 }}>Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={[styles.stepContainer, { borderColor }]}>
          <ThemedText type='default' style={{ textAlign: 'justify' }}>Capture an image using your device camera or click
            <ThemedText type='link'>
              {' '}Camera{' '}
            </ThemedText>
            to use the mobile app camera instead. Edit the image as needed.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.rowContainer}>
          <ThemedView style={[styles.uploadStep, { borderColor }]}>
            <ThemedText type='default' style={{ textAlign: 'justify' }}>
              Upload your captured image from local device, click
              <ThemedText type='link'>{' '}Upload{' '}</ThemedText>
              to upload the image.
            </ThemedText>
          </ThemedView>
          <UploadButton onPress={handleUpload} />
        </ThemedView>

        <ThemedView style={[styles.stepContainer, { borderColor }]}>
          <ThemedText type="default" style={{ textAlign: 'justify' }} >
            Attached is an expected image from camera capture or image upload.
          </ThemedText>
        </ThemedView>

        <DropdownButton />

        <ExportCSVButton data={data} />

        <ThemedView style={[styles.tableWrapper, { borderColor }]}>
          <TableComponent data={data}/>
        </ThemedView>


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
  container: { flex: 1 },
  scrollView: { flex: 1, },
  content: { padding: 20 },
  titleContainer: { gap: 8, flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  stepContainer: { borderRadius: 10, padding: 10, marginTop: 5, ...sharedStyles.borderStyle },
  rowContainer: { flexDirection: 'row', flexShrink: 1, marginTop: 5 },
  uploadStep: {
    marginRight: 5,
    flexGrow: 1,
    flexShrink: 1,
    borderRadius: 10,
    padding: 5,
    ...sharedStyles.borderStyle
  },
  tableWrapper: {
    marginTop: 10,
    overflow: 'hidden',
    borderRadius: 10,
    ...sharedStyles.borderStyle,
  }
});
