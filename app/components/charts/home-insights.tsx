import { format } from "date-fns";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Text } from "~/components/ui/text";

type Consumption = {
  key: string;
  value: number;
};

interface DashboardChartProps {
  data: Consumption[];
}

export default function HomeInsightsChart({ data }: DashboardChartProps) {
  const formattedData = data.map((item) => ({
    value: item.value,
  }));

  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="py-2 bg-white rounded-lg">
      <Text className="text-sm mb-2 text-gray-600">Energy Consumption:</Text>
      <LineChart
        areaChart
        curved
        data={formattedData}
        width={screenWidth - 40}
        initialSpacing={0}
        startFillColor="rgb(0, 0, 0)"
        startOpacity={0.8}
        endFillColor="rgb(255, 255, 255)"
        endOpacity={0.3}
        hideAxesAndRules
        hideYAxisText
        hideRules
        yAxisLabelWidth={0}
        adjustToWidth
        height={80}
      />
    </View>
  );
}
