import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useResults } from "../context/resultContext";
import { getLocalApiUrl } from "@/getLocalIP";
import * as FileSystem from "expo-file-system";

export function useProcessImage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { addResult } = useResults();
  const router = useRouter();

  const processImage = async (
    image: string | null,
    options?: {
      geoData?: {
        latitude?: number;
        longitude?: number;
        locationName?: string;
      };
      type?: 'camera' | 'gallery';
    }
  ) => {
    if (!image) {
      console.error("No image found.");
      Alert.alert("Error", "No image available to process.");
      return;
    }

    const API_URL = await getLocalApiUrl(8000, "FAST_API_URL");

    setIsProcessing(true);
    let base64Data = "";

    try {
      base64Data = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const payload ={
        image: base64Data,
        type: options?.type || 'unknown',
        geoData: {
          latitude: options?.geoData?.latitude ?? null,
          longitude: options?.geoData?.longitude ?? null,
          locationName: options?.geoData?.locationName ?? null,
        },
      };

      console.log("Payload:", {
        type: payload.type,
        geoData: payload.geoData,
        base64Length: base64Data.length,
        base64Preview: base64Data.slice(0, 10) + '...'
      });

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse server response:", parseError);
        Alert.alert("Error", "Invalid response format from server.");
        setIsProcessing(false);
        return;
      }

      if (!result) {
        console.error("Result is undefined or null");
        Alert.alert("Error", "Invalid response from server.");
        return;
      }

      if (result.reconstructed_image && result.file_path) {
        const normalizedPath = result.file_path.replace(/\\/g, "/");
        const fileName = normalizedPath.split("/UPLOAD_FOLDER/uploaded").pop() || `processed_${Date.now()}.jpg`;

        const localUri = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.writeAsStringAsync(localUri, result.reconstructed_image, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log("Processed Image Path:", localUri);

        addResult({
          localUri,
          fileName,
          numDetections: result.num_detections,
          detectionTime: result.elapsed_time,
          averageCocolisap: result.avg_detections_per_patch,
          classification: result.classification,
        });

        router.push('/employee-tabs/resultDisplay');
      } else {
        Alert.alert("Processing failed", "Reconstructed image is unavailable.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return { processImage, isProcessing };
}
