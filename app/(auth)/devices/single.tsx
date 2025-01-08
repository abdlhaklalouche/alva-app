import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchParams } from "expo-router/build/hooks";
import Drawer from "expo-router/drawer";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import NotFoundScreen from "~/app/+not-found";
import DeviceEnergiesChart from "~/app/components/charts/device-energies";
import { Text } from "~/components/ui/text";
import Device from "~/types/Device";
import DeviceEnergy from "~/types/DeviceEnergy";

export default function DevicePage() {
  const searchParams = useSearchParams();

  const jsonDevice = searchParams.get("entity") ?? "";
  const device: Device = jsonDevice ? JSON.parse(jsonDevice) : null;

  if (!jsonDevice) return NotFoundScreen();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Drawer.Screen name="devices/single" options={{ title: device.name }} />
      <View>
        <FlatList
          data={device.energies}
          className="p-4"
          renderItem={({ item }) => <DeviceEnergyItem energy={item} />}
          ListHeaderComponent={
            <View className="bg-white p-4 rounded-lg">
              <DeviceEnergiesChart data={device.energies} />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const DeviceEnergyItem = ({ energy }: { energy: DeviceEnergy }) => {
  return (
    <View className="my-2 p-4 bg-white rounded-lg">
      <View className="flex-row justify-between">
        <View className="items-center shrink-0">
          <View className="ml-4">
            <Text className="text-lg font-medium">{energy.value}</Text>
            <Text className="text-sm text-gray-500">{energy.time}</Text>
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};
