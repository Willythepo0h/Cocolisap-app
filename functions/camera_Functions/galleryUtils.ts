import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { Router } from "expo-router";

export const requestMediaLibraryPermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert("Permission Required", "Storage access is needed to save photos.");
    return false;
  }
  return true;
};

export const saveToGallery = async (photoUri: string) => {
  try {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    await MediaLibrary.saveToLibraryAsync(photoUri);
    return { success: true, uri: photoUri };
  } catch (error) {
    console.error("Error saving image:", error);
  }
};

export const openGallery = async (router: Router) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    allowsEditing: true,
    quality: 1,
  });
  
  if (result.canceled) {
    Alert.alert("No image selected", "Image selection cancelled.");
  }

  if (!result.canceled && result.assets.length > 0) {
    console.log("Selected Image:", result.assets[0].uri);

    router.push({
      pathname: "/employee-tabs/uploadDisplay",
      params: { image: result.assets[0].uri}
    });

    return result.assets[0].uri;
  }
  return null;
};

export const fetchLastPhoto = async () => {
  const hasPermission = await requestMediaLibraryPermission();
  if (!hasPermission) return null;

  try {
    const assets = await MediaLibrary.getAssetsAsync({
      mediaType: 'photo',
      sortBy: ['creationTime'],
      first: 1,
    });

    if (assets.assets.length > 0) {
      return assets.assets[0].uri;
    } else {
      console.log("No photos found in the gallery.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching last photo:", error);
    return null;
  }
};
