import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { format } from "date-fns";
import { LineChart } from "react-native-gifted-charts";
import DeviceEnergy from "~/types/DeviceEnergy";

export default function DeviceEnergiesChart({
  data,
}: {
  data: DeviceEnergy[];
}) {
  const screenWidth = Dimensions.get("window").width;

  // Fomatting data
  const formattedData = data.map((item) => ({
    value: item.value,
    label: format(new Date(item.time), "MMM dd"),
    xAxisLabel: format(new Date(item.time), "MMM dd"),
  }));

  // Grouping data
  const groupedDataWithSum = formattedData.reduce((acc: any, current: any) => {
    const value = parseFloat(current.value);

    if (!acc[current.label]) {
      acc[current.label] = { label: current.label, value: 0 };
    }

    acc[current.label].value += value;

    return acc;
  }, {});

  const resultArray: any = Object.values(groupedDataWithSum);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={resultArray}
          height={150}
          width={screenWidth - 90}
          adjustToWidth
          yAxisLabelPrefix="Kwh"
          yAxisLabelSuffix="Kwh"
          isAnimated={true}
          showVerticalLines={true}
          yAxisTextStyle={{
            fontSize: 10,
          }}
          xAxisLabelTextStyle={{
            fontSize: 10,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    marginTop: 10,
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: 12,
    color: "gray",
  },
});
