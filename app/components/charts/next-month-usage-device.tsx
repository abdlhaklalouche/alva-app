import { format } from "date-fns";
import { Dimensions, View } from "react-native";
import {
  BarChart,
  barDataItem,
  DataSet,
  LineChart,
} from "react-native-gifted-charts";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/data/colors";
import { InsightsDevice } from "~/types/Insights";

export default function InsightsPredictionDeviceChart({
  data,
}: {
  data: InsightsDevice[];
}) {
  const screenWidth = Dimensions.get("window").width;

  const devices = data[0]?.devices ?? [];

  const deviceNames = Object.keys(devices);

  const result: any = deviceNames.map(() => []);

  data.forEach((entry) => {
    deviceNames.forEach((deviceName: any, index) => {
      result[index].push({
        label: format(new Date(entry.date), "MMM dd"),
        value: entry.devices[deviceName],
        textColor: COLORS[index],
      });
    });
  });

  const chartData: DataSet[] = result.map((items: any, index: any) => ({
    data: items,
    color: COLORS[index],
    textColor: COLORS[index],
    textFontSize: 10,
  }));

  return (
    <View className="w-full">
      <View className="mb-4">
        <LineChart
          curved
          height={160}
          dataSet={chartData}
          width={screenWidth - 120}
          initialSpacing={0}
          yAxisTextStyle={{
            fontSize: 10,
          }}
          xAxisLabelTextStyle={{
            fontSize: 10,
          }}
        />
      </View>
      <View className="ml-10">
        {deviceNames.map((device: any, index) => (
          <View key={index} className="mb-2">
            <View className="flex-row items-center">
              <View
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: COLORS[index] }}
              ></View>
              <Text className="text-xs">{device}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
