import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default function useLocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Ask GPS access permission
  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        const granted = status === 'granted';

        setHasPermission(granted);

        if (!granted) {
          Alert.alert("Permission Denied", "Location permission is needed to tag photo locations.");
        }
      } catch (err) {
        setError("Failed to request location permission.");
        console.error(err);
      }
    };
    getLocationPermission();
  }, []);

  const getLocation = useCallback(async () => {
    if (!hasPermission) {
      Alert.alert("Location Disabled", "Cannot get location without permission.");
      return null;
    }

    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = loc.coords;

      const place = await Location.reverseGeocodeAsync({ latitude, longitude });
      let resolvedName = null;

      if (place.length > 0) {
        const { city, region, country } = place[0];
        resolvedName = `${city || ''}, ${region || ''}, ${country || ''}`;
        setLocationName(resolvedName);
      }
      
      setLocation({ latitude, longitude });

      return { coords: { latitude, longitude }, name: resolvedName };

    } catch (error) {
    console.error("Error getting location:", error);
    setError("Failed to fetch location.");
    return null;
  }
}, [hasPermission, location]);

return { location, locationName, hasPermission, error, getLocation };
}
