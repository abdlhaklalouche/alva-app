import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import Drawer from "expo-router/drawer";
import { Pressable, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import NotFoundScreen from "~/app/+not-found";
import { Text } from "~/components/ui/text";
import Entity from "~/types/Entity";
import Room from "~/types/Room";

export default function EntityPage() {
  const searchParams = useSearchParams();

  const jsonEntity = searchParams.get("entity") ?? "";
  const entity: Entity = jsonEntity ? JSON.parse(jsonEntity) : null;

  if (!entity) return NotFoundScreen();

  return (
    <View>
      <Drawer.Screen name="entities/single" options={{ title: entity.name }} />
      <View>
        <FlatList
          data={entity.rooms}
          className="p-4"
          renderItem={({ item }) => <RoomItem room={item} />}
        />
      </View>
    </View>
  );
}

const RoomItem = ({ room }: { room: Room }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          // @ts-ignore
          pathname: "devices",
          params: {
            room_id: room.id,
          },
        });
      }}
      className="my-2 p-4 bg-white rounded-lg"
    >
      <View className="flex-row justify-between">
        <View className="flex-row items-center shrink-0">
          <View className="flex items-center justify-center relative rounded-full h-12 w-12 bg-gray-900">
            <MaterialIcons name="meeting-room" size={18} color="white" />
          </View>
          <View className="ml-4">
            <Text className="text-lg font-medium">{room.name}</Text>
            <Text className="text-sm text-gray-500">
              {room.devices.length} device
            </Text>
          </View>
        </View>
        <View></View>
      </View>
    </Pressable>
  );
};
