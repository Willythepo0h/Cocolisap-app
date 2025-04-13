import {
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import { useRoute } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useImageUpload } from "@/functions/useImageUpload";
import { useProcessImage } from "@/functions/useDetectImage";
import DeleteButton from "@/components/uploadDisplayComponents/DeleteButton";
import CustomButton from "@/components/uploadDisplayComponents/CustomButton";

export default function UploadDisplayScreen() {
  const route = useRoute();
  const { uploadImage } = useImageUpload();
  const [loading, setLoading] = useState(true);
  const { processImage, isProcessing } = useProcessImage();
  const { image: initialImage, latitude, longitude, locationName } =
    route.params as {
      image?: string, latitude?: number, longitude?: number,
      locationName?: string
    };
  const [geoData, setGeoData] = useState<{
    latitude?: number,
    longitude?: number,
    locationName?: string
  }>({
    latitude,
    longitude,
    locationName
  });

  const formatCoord = (value: any) => {
    const num = typeof value === 'number' ? value : Number(value);
    return !isNaN(num) ? num.toFixed(5) : 'N/A';
  };

  const [displayedImage, setDisplayedImage] = useState<string | null>(initialImage || null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  type: geoData.latitude && geoData.longitude ? 'camera' : 'gallery'

  const setImageSize = (imageUri: string) => {
    setLoading(true);
    Image.getSize(
      imageUri,
      (width, height) => {
        const screenWidth = Dimensions.get("window").width;
        const aspectRatio = width / height;
        const adjustedHeight = screenWidth / aspectRatio;
        setImageDimensions({ width: screenWidth, height: adjustedHeight });
        setLoading(false);
      },
      () => setLoading(false)
    );
  };

  useEffect(() => {
    if (initialImage) {
      setDisplayedImage(initialImage);
    }
  }, [initialImage]);

  useEffect(() => {
    if (displayedImage) {
      setImageSize(displayedImage);
    }
  }, [displayedImage]);

  const handleUpload = async () => {
    const newImage = await uploadImage();
    if (newImage?.uri) {
      setDisplayedImage(newImage.uri);
      setImageDimensions({ width: 0, height: 0 });
      setGeoData({});
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.topButtonContainer}>
        <BackButton />
      </ThemedView>

      <ThemedView style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : displayedImage ? (
          <ThemedView style={styles.imageWrapper}>
            <Image
              source={{ uri: displayedImage }}
              style={[styles.image, { width: imageDimensions.width, height: imageDimensions.height }]}
            />
            {geoData.locationName && geoData.latitude != null && geoData.longitude != null &&
              !isNaN(geoData.latitude) && !isNaN(geoData.longitude) ? (
              <ThemedText type="default" style={styles.locationText}>
                Location: {geoData.locationName} (Lat: {formatCoord(geoData.latitude)}, Lon: {formatCoord(geoData.longitude)})
              </ThemedText>
            ) : null}
          </ThemedView>
        ) : (
          <ThemedText>No image selected.</ThemedText>
        )}
      </ThemedView>
      <ThemedView style={styles.bottomButtonContainer}>
        <CustomButton onPress={handleUpload} text="Upload" disabled={isProcessing} />
        <DeleteButton setDisplayedImage={(uri) => {
          setDisplayedImage(uri);
          setGeoData({});
        }} />
        <CustomButton onPress={() => displayedImage && processImage(displayedImage, {geoData,
      type: geoData.latitude && geoData.longitude ? 'camera' : 'gallery',})} text="Detect" disabled={isProcessing} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  imageContainer: { alignItems: "center", justifyContent: "center" },
  image: { alignSelf: 'center', resizeMode: "contain" },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtonContainer: {
    top: 10,
    zIndex: 10,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: 'transparent'
  },
  bottomButtonContainer: {
    bottom: 10,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignContent: 'center',
    justifyContent: 'center',
    flexShrink: 1,
    backgroundColor: 'transparent'
  },
  locationText: {
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 3,
    backgroundColor: 'white',
    padding: 5,
    borderWidth: 2
  },
});
