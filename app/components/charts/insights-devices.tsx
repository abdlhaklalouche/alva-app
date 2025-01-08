import { format } from "date-fns";
import { Dimensions, View } from "react-native";
import { LineChart, lineDataItem } from "react-native-gifted-charts";
import { Text } from "~/components/ui/text";
import { COLORS } from "~/data/colors";
import { DeviceConsumption } from "~/types/Insights";

export default function InsightsDevicesChart({
  data,
}: {
  data: DeviceConsumption[];
}) {
  const screenWidth = Dimensions.get("window").width;

  const devices = data[0].devices ?? [];

  const deviceNames = Object.keys(devices);

  const result: any = deviceNames.map(() => []);

  data.forEach((entry: DeviceConsumption) => {
    deviceNames.forEach((deviceName: any, index) => {
      result[index].push({
        value: entry.devices[deviceName],
        label: format(new Date(entry.date), "MMM dd"),
        textColor: COLORS[index],
      });
    });
  });

  return (
    <View className="w-full">
      <View className="mb-4">
        <LineChart
          areaChart
          curved
          data={result[0] ?? []}
          data2={result[1] ?? []}
          data3={result[2] ?? []}
          data4={result[3] ?? []}
          data5={result[4] ?? []}
          width={screenWidth - 80}
          adjustToWidth
          initialSpacing={0}
          yAxisTextStyle={{
            fontSize: 10,
          }}
          xAxisLabelTextStyle={{
            fontSize: 10,
          }}
          startFillColor1={COLORS[0]}
          startFillColor2={COLORS[1]}
          startFillColor3={COLORS[3]}
          startFillColor4={COLORS[4]}
          startFillColor5={COLORS[5]}
          color1={COLORS[0]}
          color2={COLORS[1]}
          color3={COLORS[3]}
          color4={COLORS[4]}
          color5={COLORS[5]}
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
