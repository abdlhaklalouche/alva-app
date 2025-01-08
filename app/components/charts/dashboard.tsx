import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { format } from "date-fns";
import { LineChart } from "react-native-gifted-charts";

type Consumption = {
  key: string;
  value: number;
};

interface DashboardChartProps {
  data: Consumption[];
}

export default function DashboardChart({ data }: DashboardChartProps) {
  const formattedData = data.map((item) => ({
    value: item.value,
    label: format(new Date(item.key), "MMM dd"),
    xAxisLabel: format(new Date(item.key), "MMM dd"),
  }));

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={formattedData}
          height={150}
          width={screenWidth - 60}
          adjustToWidth
          yAxisLabelPrefix="Kwh"
          yAxisLabelSuffix="Kwh"
          isAnimated={true}
          showVerticalLines={false}
          hideYAxisText
          xAxisLabelTextStyle={{
            fontSize: 10,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Showing total energy consumption during the selected period
        </Text>
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
