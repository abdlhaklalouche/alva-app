import { format } from "date-fns";
import { Dimensions, View } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { InsightsOverall } from "~/types/Insights";

export default function InsightsPredictionOverallChart({
  data,
}: {
  data: InsightsOverall[];
}) {
  const chartData: barDataItem[] = data.map((item) => ({
    label: format(new Date(item.date), "MMM dd"),
    value: item.total,
  }));

  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <BarChart
        width={screenWidth - 90}
        adjustToWidth
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="black"
        spacing={12}
        height={150}
        data={chartData}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{
          fontSize: 9,
        }}
        yAxisTextStyle={{
          fontSize: 10,
        }}
      />
    </View>
  );
}
