import React, { useState } from 'react';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';
import { ThemedText } from '../ThemedText';
import { View, Text, TouchableOpacity } from 'react-native';

type PieDataItem = {
  value: number;
  color: string;
  gradientCenterColor?: string;
  focused?: boolean;
};

type LegendItem = {
  label: string;
  color: string;
};

interface PieChartComponentProps {
  title: string;
  pieData: PieDataItem[];
  centerValue: string;
  centerLabel: string;
  legendItems: LegendItem[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  title,
  pieData,
  legendItems,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const enhancedPieData = pieData.map((item, index) => ({
    ...item,
    focused: index === focusedIndex,
  }));

  const renderDot = (color: string) => (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );

  const renderLegendComponent = () => {
    const rows = [];
    for (let i = 0; i < legendItems.length; i += 2) {
      rows.push(
        <View
          key={i}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {[legendItems[i], legendItems[i + 1]].map((item, index) => {
            if (!item) return null;
            const realIndex = i + index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setFocusedIndex(realIndex)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  marginRight: index === 0 ? 20 : 0,
                }}>
                {renderDot(item.color)}
                <ThemedText type='default' >{item.label}</ThemedText>
              </TouchableOpacity>
              );
          })}
        </View>
      );
    }
    return <>{rows}</>;
  };

  const focusedItem = pieData[focusedIndex];
  const focusedLabel =
    legendItems[focusedIndex]?.label.split(':')[0] || 'Selected';

  return (
    <View
      style={{
        margin: 20,
        padding: 10,
        borderRadius: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        width: '100%',
      }}>
      <ThemedText type='title'>
        {title}
      </ThemedText>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <PieChart
          labelsPosition='inward'
          data={enhancedPieData}
          donut
          showGradient
          sectionAutoFocus
          focusOnPress
          radius={150}
          innerRadius={100}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ThemedText type='defaultSemiBold' style={{color: 'white'}}>
                {focusedItem?.value ?? '-'}%
              </ThemedText>
              <ThemedText type='title' style={{color: 'white'}}>{focusedLabel}</ThemedText>
            </View>
          )}
          onPress={(item: pieDataItem, index: number) => setFocusedIndex(index)}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

export default PieChartComponent;
