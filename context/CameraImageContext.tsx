import React, { createContext, useContext, useState } from 'react';

type LocationData = {
  latitude: number;
  longitude: number;
};

type CameraImageContextType = {
  imageUri: string | null;
  location: LocationData | null;
  locationName: string | null;
  setImageUri: (uri: string | null) => void;
  setLocation: (loc: LocationData | null) => void;
  setLocationName: (name: string | null) => void;
  setCameraImageData: (
    uri: string,
    loc: LocationData,
    name: string
  ) => void;
};

const CameraImageContext = createContext<CameraImageContextType | undefined>(undefined);

export const CameraImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  const setCameraImageData = (
    uri: string,
    loc: LocationData,
    name: string
  ) => {
    setImageUri(uri);
    setLocation(loc);
    setLocationName(name);
  };

  return (
    <CameraImageContext.Provider
      value={{
        imageUri,
        location,
        locationName,
        setImageUri,
        setLocation,
        setLocationName,
        setCameraImageData,
      }}
    >
      {children}
    </CameraImageContext.Provider>
  );
};

export const useCameraImage = () => {
  const context = useContext(CameraImageContext);
  if (!context) throw new Error('useCameraImage must be used within a CameraImageProvider');
  return context;
};
