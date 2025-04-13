// utils/captureImage.ts
import { Alert } from "react-native";

interface CaptureImageParams {
  cameraRef: React.RefObject<any>;
  hasPermission: boolean;
  getLocation: () => Promise<any>;
  setCapturedImage: (img: any) => void;
  setLastPhotoUri: (uri: string) => void;
  imageWidth: any;
  imageOpacity: any;
  saveToGallery: (uri: string) => Promise<any>;
  setCameraImageData: (uri: string, coords: any, name: string) => void;
  router: any;
  setIsFetchingLocation: (val: boolean) => void;
}

export const captureImage = async ({
  cameraRef,
  hasPermission,
  getLocation,
  setCapturedImage,
  setLastPhotoUri,
  imageWidth,
  imageOpacity,
  saveToGallery,
  setCameraImageData,
  router,
  setIsFetchingLocation,
}: CaptureImageParams) => {
  if (!cameraRef.current) {
    Alert.alert("Camera not ready", "Please ensure the camera is loaded before capturing.");
    return;
  }

  setIsFetchingLocation(true);

  try {
    const photo = await cameraRef.current.takePictureAsync();
    if (!photo) {
      console.warn("No image was captured.");
      setIsFetchingLocation(false);
      return;
    }

    let coords = null;
    let locationNameFromHook = null;
    if (hasPermission) {
      const locationResult = await getLocation();

      if (locationResult) {
        coords = locationResult.coords;
        locationNameFromHook = locationResult.name;
      }
    } else {
      console.warn("Location permission not granted.");
    }

    setCapturedImage(photo);
    setLastPhotoUri(photo.uri);
    imageWidth.setValue(100);
    imageOpacity.setValue(1);

    const saved = await saveToGallery(photo.uri);
    if (saved && saved.success) {
      setLastPhotoUri(saved.uri);
    } else {
      console.warn("Failed to save image to gallery.");
    }

    if (coords && locationNameFromHook) {
      setCameraImageData(photo.uri, coords, locationNameFromHook);
      router.push({
        pathname: "/employee-tabs/uploadDisplay",
        params: {
          image: photo.uri,
          latitude: coords.latitude,
          longitude: coords.longitude,
          locationName: locationNameFromHook,
        },
      });
    } else {
      Alert.alert("Location Error", "Unable to retrieve location. Please try again.");
    }

  } catch (error) {
    console.error("Error capturing image:", error);
  } finally {
    setIsFetchingLocation(false);
  }
};
