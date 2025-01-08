import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts"; // Importing PieChart from Gifted Charts

// Example type definition for EntityConsumption
type EntityConsumption = {
  entity: string;
  consumption: number;
};

const chartConfig = {
  consumption: {
    label: "Consumption",
  },
};

export default function InsightsEntitiesChart({
  data,
}: {
  data: EntityConsumption[];
}) {
  const totalConsumption = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.consumption, 0);
  }, [data]);

  const pieData = data.map((item) => ({
    value: item.consumption,
    text: item.entity,
    frontColor: "#fff",
  }));

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          radius={80}
          innerRadius={60}
          textSize={16}
          centerLabelComponent={() => (
            <Text style={styles.totalConsumptionText}>
              {totalConsumption.toLocaleString()} kWh
            </Text>
          )}
        />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Energy consumption by entities for the selected period
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  totalConsumptionText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionContainer: {
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 12,
    color: "#000000",
    textAlign: "center",
  },
});
