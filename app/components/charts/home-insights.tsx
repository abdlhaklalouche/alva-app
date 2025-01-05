import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Text } from "~/components/ui/text";

const data = [
  { value: 0 },
  { value: 50 },
  { value: 80 },
  { value: 40 },
  { value: 70 },
  { value: 90 },
  { value: 50 },
  { value: 80 },
  { value: 40 },
  { value: 70 },
];

export default function HomeInsightsChart() {
  return (
    <View className="px-4 py-2 bg-white rounded-lg">
      <Text className="text-sm mb-2 text-gray-600">Energy Consumption:</Text>
      <LineChart
        areaChart
        data={data}
        startFillColor="rgb(0, 0, 0)"
        startOpacity={0.8}
        endFillColor="rgb(255, 255, 255)"
        endOpacity={0.3}
        hideAxesAndRules
        hideYAxisText
        yAxisLabelWidth={0}
        adjustToWidth
        height={80}
      />
    </View>
  );
}
