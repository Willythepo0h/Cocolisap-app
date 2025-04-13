import React from "react";
import { LineChart } from "react-native-gifted-charts";
import { ThemedText } from "../ThemedText";
import { ScrollView } from "react-native-gesture-handler";
import { useColorScheme } from "react-native";

interface AvgEntry {
  value: number;
  timestamp: string;
}

interface LineChartComponentProps {
  averageValues: AvgEntry[];
  minDataPoints: number;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  averageValues,
  minDataPoints,
}) => {

  const theme = useColorScheme();
  const isDarkMode = theme === "dark";

  const colors = {
    text: isDarkMode ? "white" : "black",
    axisLine: isDarkMode ? "white" : "#ccc",
  };

  const paddedValues = [...averageValues];
  while (paddedValues.length < minDataPoints) {
    paddedValues.push({ value: NaN, timestamp: '' });
  }

  const lineData = paddedValues.map((entry) => ({
    value: isNaN(entry.value) ? 0 : entry.value,
    dataPointText: isNaN(entry.value) ? '' : entry.value.toFixed(0),
    hideDataPoint: isNaN(entry.value),
    timestamp: entry.timestamp,
  }));

  return (
    <ScrollView horizontal style={{ padding: 10, borderRadius: 10 }}>
      <LineChart
        // data related prompts
        data={lineData}
        maxValue={Math.max(...averageValues.map(a => a.value), 150)}

        // table design promts
        spacing={30}
        stepValue={30}
        noOfSections={5}
        thickness={3}
        yAxisLabelTexts={Array.from({ length: 6 }, (_, i) => `${i * 30}`)}
        yAxisColor={colors.text}
        xAxisColor={colors.text}

        // animations
        focusEnabled
        lineGradient
        isAnimated
        scrollAnimation
        animateOnDataChange

        // data point prompt
        initialSpacing={40}
        textColor={colors.text}
        textFontSize={12}
        dataPointsColor={"red"}
        dataPointsHeight={20}

        // pointer
        pointerConfig={{
          pointerVanishDelay: 1000,
          shiftPointerLabelX: 20,
          shiftPointerLabelY: 50,
          pointerLabelComponent: (items: any) => {
            const timestamp = items[0]?.timestamp;
            return timestamp ? (
              <ThemedText style={{
                //backgroundColor: 'white', 
                borderWidth: 1,
                borderRadius: 10,
                padding: 2,
                minWidth: 100,
                maxHeight: 60,
                textAlign: 'justify'
              }}>
                {timestamp}
              </ThemedText>
            ) : null;
          }
        }}
      />
    </ScrollView>
  );
};

export default LineChartComponent;
