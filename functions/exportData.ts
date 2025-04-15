import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';

export const exportToCSV = async (data: any[], headers: string[], filename = 'cocolisap_data.csv') => {
  try {
    const csvRows = [
      headers.join(','), // header row
      ...data.map(item =>
        headers.map(header => {
          const key = header.toLowerCase().replace(/\s+/g, '_');
          return `"${item[key] ?? ''}"`;
        }).join(',')
      ),
    ];

    const csvString = csvRows.join('\n');
    const fileUri = FileSystem.documentDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (!(await Sharing.isAvailableAsync())) {
      console.log("Sharing not available, launching intent");
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: fileUri,
        flags: 1,
      });
      return;
    }

    await Sharing.shareAsync(fileUri);
  } catch (err) {
    console.error("Export failed", err);
  }
};
