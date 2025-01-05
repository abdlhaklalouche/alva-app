import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSearchParams } from "expo-router/build/hooks";
import Drawer from "expo-router/drawer";
import { TouchableOpacity, View } from "react-native";
import NotFoundScreen from "~/app/+not-found";
import { Text } from "~/components/ui/text";
import Device from "~/types/Device";

export default function DevicePage() {
  const searchParams = useSearchParams();

  const jsonDevice = searchParams.get("entity") ?? "";
  const device: Device = jsonDevice ? JSON.parse(jsonDevice) : null;

  if (!jsonDevice) return NotFoundScreen();

  return (
    <View>
      <Drawer.Screen name="devices/single" options={{ title: device.name }} />
    </View>
  );
}
