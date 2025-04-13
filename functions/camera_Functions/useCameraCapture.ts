import { Alert } from 'react-native';
import { saveToGallery } from './galleryUtils';
import { CameraCapturedPicture } from 'expo-camera';

export const useCaptureImage = (
  cameraRef: React.RefObject<any>, 
  imageWidth: any, 
  imageOpacity: any, 
  setCapturedImage: React.Dispatch<React.SetStateAction<CameraCapturedPicture | null>>, 
  setLastPhotoUri: React.Dispatch<React.SetStateAction<string | null>>,
  getLocation: () => Promise<any>
) => {
  const captureImage = async () => {
    if (!cameraRef.current) {
      Alert.alert("Camera not ready", "Please ensure the camera is loaded before capturing.");
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (!photo) {
        console.warn("No image was captured.");
        return;
      }

      const coords = await getLocation();
      if (coords) {
        console.log(`Photo taken at: Latitude ${coords.latitude}, Longitude ${coords.longitude}`);
      }

      setCapturedImage(photo);
      setLastPhotoUri(photo.uri);
      imageWidth.setValue(100);  
      imageOpacity.setValue(1);

      const savedUri = await saveToGallery(photo.uri);
      if (savedUri?.success) {
        setLastPhotoUri(savedUri.uri);
      } else {
        console.warn("Failed to save image to gallery.");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  return captureImage;
};
