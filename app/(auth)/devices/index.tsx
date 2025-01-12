import { FlatList, Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useGetDevices } from "~/api/devices";
import Device from "~/types/Device";
import { BatteryCharging } from "lucide-react-native";
import { router } from "expo-router";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Room from "~/types/Room";
import React from "react";
import { useGetRooms } from "~/api/rooms";

export default function DevicesScreen() {
  const [room, setRoom] = React.useState<Room | undefined>(undefined);

  const {
    query: { data: rooms, isLoading: isLoadingRooms },
  } = useGetRooms();

  const {
    query: { data: devices, isLoading: isLoadingDevices },
  } = useGetDevices();

  return (
    <View>
      <FlatList
        data={devices?.data ?? []}
        className="p-4"
        renderItem={({ item }) => <DeviceItem device={item} />}
      />
    </View>
  );
}

const DeviceItem = ({ device }: { device: Device }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/devices/single",
          params: {
            entity: JSON.stringify(device),
          },
        });
      }}
      className="my-2 p-4 bg-white rounded-lg"
    >
      <View className="flex-row justify-between">
        <View className="flex-row items-center shrink-0">
          <View className="flex items-center justify-center relative rounded-full h-10 w-10 bg-gray-900">
            <BatteryCharging size={20} color="white" />
          </View>
          <View className="ml-4">
            <Text className="text-lg font-medium">{device.name}</Text>
            <Text className="text-sm text-gray-500">{device.room.name}</Text>
          </View>
        </View>
        <View></View>
      </View>
    </Pressable>
  );
};
