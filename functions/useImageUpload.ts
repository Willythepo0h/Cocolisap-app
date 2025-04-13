import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useImageUpload = () => {
  const [pickedImage, setPickedImage] = useState<{ uri: string } | null>(null);

  const uploadImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to allow access to your photo library to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      let imageUri = result.assets[0].uri;
      console.log('Image URI:', imageUri);

      const asset = result.assets[0];
      const image = {
        uri: asset.uri,
        type: asset.type ?? 'image/jpeg',
        fileName: asset.fileName ?? 'image.jpg'
      };

      setPickedImage(image);
      return image;
    } else {
      Alert.alert('Warning',
        'No image selected.',
        [
          {
            text: 'Okay',
            style: 'cancel',
          }
        ]);
    }
  };

  return { pickedImage, uploadImage };
};
