import {
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import BackButton from '@/components/BackButton';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useResults } from '@/context/resultContext';
import React, { useState, useEffect, useMemo } from 'react';

export default function ResultScreen() {
  const { results } = useResults();
  const latestResult = results?.[results.length - 1];
  const screenWidth = Dimensions.get('window').width;
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  if (!latestResult) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText type='defaultSemiBold'>No results available to display.</ThemedText>
      </SafeAreaView>
    );
  }

  const latestResultData = useMemo(() => {
    return latestResult
      ? {
        localUri: latestResult.localUri,
        fileName: latestResult.fileName,
        numDetections: latestResult.numDetections,
        detectionTime: latestResult.detectionTime,
        averageCocolisap: latestResult.averageCocolisap,
        classification: latestResult.classification
      }
      : {};
  }, [latestResult]);

  useEffect(() => {
    if (latestResultData?.localUri) {
      Image.getSize(latestResultData?.localUri, (width, height) => {
        const aspectRatio = width / height;
        const newWidth = screenWidth;
        const newHeight = screenWidth / aspectRatio;

        setImageDimensions((prev) =>
          prev.width === newWidth && prev.height === newHeight
            ? prev
            : { width: newWidth, height: newHeight }
        );
      });
    }
  }, [latestResultData.localUri]);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.topButtonContainer}>
        <BackButton />
      </ThemedView>

      <ThemedView style={styles.imageContainer}>
        <Image style={{
          width: imageDimensions.width,
          height: imageDimensions.height,
          resizeMode: 'contain'
        }} source={{ uri: latestResultData?.localUri as string }} />
      </ThemedView>

      <ThemedView style={styles.resultContainer}>
        <ThemedText type='title'>Detection Results</ThemedText>
        <ThemedView style={styles.resultRow}>
          <ThemedText type='defaultSemiBold'>Filename: </ThemedText>
          <ThemedText type='default'>{latestResultData?.fileName}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.resultRow}>
          <ThemedText type='defaultSemiBold'>Detection Time: </ThemedText>
          <ThemedText type='default'>{latestResultData?.detectionTime}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.resultRow}>
          <ThemedText type='defaultSemiBold'>Total Cocolisap Detected: </ThemedText>
          <ThemedText type='default'>{latestResultData?.numDetections}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.resultRow}>
          <ThemedText type='defaultSemiBold'>Average Cocolisap Count: </ThemedText>
          <ThemedText type='default'>{latestResultData?.averageCocolisap}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.resultRow}>
          <ThemedText type='defaultSemiBold'>Classification: </ThemedText>
          <ThemedText type='default'>{latestResultData?.classification}</ThemedText>
        </ThemedView>
      </ThemedView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  topButtonContainer: {
    top: 10,
    zIndex: 10,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: 'transparent'
  },
  imageContainer: { alignItems: "center", justifyContent: "center" },
  resultContainer: {
    bottom: 10,
    position: 'absolute',
    padding: 5,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  resultRow: { flexDirection: 'row', alignItems: 'center' }
})