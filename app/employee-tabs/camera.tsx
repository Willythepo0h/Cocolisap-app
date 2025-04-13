import {
  Animated,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from "expo-router";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useCameraImage } from '@/context/CameraImageContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import useLocation from '@/functions/camera_Functions/useLocation';
import { captureImage } from '@/functions/camera_Functions/imageCapture';
import { CameraView, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { saveToGallery, openGallery } from '@/functions/camera_Functions/galleryUtils';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const router = useRouter();
  const { setCameraImageData } = useCameraImage();
  const cameraRef = useRef<CameraView | null>(null);
  const { getLocation, hasPermission } = useLocation();
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null);

  const imageWidth = useRef(new Animated.Value(100)).current;
  const imageOpacity = useRef(new Animated.Value(1)).current;

  // Request permissions on mount
  useEffect(() => {
    if (!permission || permission.status !== 'granted') {
      requestPermission();
    }
  }, []);

  // Request camera permission
  const handlePermissionRequest = async () => {
    if (!permission || permission.status !== 'granted') {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert(
          "Permission Required",
          "Camera access is needed to take photos.",
          [{ text: "OK" }]
        );
      }
    }
  };

  // Capture image animation
  useEffect(() => {
    if (capturedImage) {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(imageWidth, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(imageOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          })
        ]).start(() => setCapturedImage(null));
      }, 2000);
    }
  }, [capturedImage]);

  const handleCapture = useCallback(() => {
    captureImage({
      cameraRef, hasPermission, getLocation, setCapturedImage,
      setLastPhotoUri, imageWidth, imageOpacity, saveToGallery,
      setCameraImageData, router, setIsFetchingLocation,
    });
  }, [
    cameraRef, hasPermission, getLocation, setCapturedImage,
    setLastPhotoUri, imageWidth, imageOpacity, saveToGallery,
    setCameraImageData, router, setIsFetchingLocation,
  ]);

  const toggleTorch = () => {
    setTorchEnabled((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      {permission?.status === 'granted' ? (
        <>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            autofocus="on"
            ratio="16:9"
            enableTorch={torchEnabled}
            onCameraReady={() => setIsCameraReady(true)}
          />

          {/* Capture Button */}
          <TouchableOpacity
            style={[styles.captureButton, { opacity: isCameraReady && !isFetchingLocation ? 1 : 0.5 }]}
            onPress={ isCameraReady && !isFetchingLocation ? handleCapture : undefined}
            disabled={!isCameraReady || isFetchingLocation}
          >
            {isFetchingLocation ? (
              <ActivityIndicator color="black" />
            ) : (
              <AntDesign name="camera" size={24} color="black" />
            )}
          </TouchableOpacity>

          {/* Flash Button */}
          <TouchableOpacity style={styles.flashButton} onPress={toggleTorch}>
            <Entypo name="flash" size={24} color={torchEnabled ? 'yellow' : 'black'} />
          </TouchableOpacity>

          {/* Gallery Preview Button */}
          <TouchableOpacity style={styles.galleryButton} onPress={() => openGallery(router)}>
            {lastPhotoUri ? (
              <Image source={{ uri: lastPhotoUri }} style={styles.galleryThumbnail} />
            ) : (
              <AntDesign name="picture" size={24} color="black" style={{ padding: 9 }} />
            )}
          </TouchableOpacity>

          {/* Display Captured Image with Location */}
          {capturedImage && (
            <Animated.View style={styles.previewContainer}>
              <Animated.Image
                source={{ uri: capturedImage.uri }}
                style={[styles.previewImage, { width: imageWidth, opacity: imageOpacity }]}
              />
            </Animated.View>
          )}
        </>
      ) : (
        <TouchableOpacity style={styles.permissionButton} onPress={handlePermissionRequest}>
          <AntDesign name="exclamationcircleo" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { width: width, height: height, position: 'absolute' },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 50,
  },
  flashButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  galleryButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 10,
  },
  galleryThumbnail: { width: 50, height: 50, borderRadius: 10 },
  permissionButton: { backgroundColor: 'red', padding: 15, borderRadius: 10 },
  previewImage: {
    position: 'absolute',
    bottom: 100,
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  previewContainer: { position: 'absolute', bottom: 50, alignItems: 'center' },
});