import { Link, router } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetEntities } from "~/api/entities";
import DynamicIcon from "~/app/components/other/dynamicon";
import { Text } from "~/components/ui/text";
import Entity from "~/types/Entity";

export default function EntitiesScreen() {
  const {
    query: { data: entities, isLoading: isLoadingEntities },
  } = useGetEntities();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <FlatList
        data={entities?.data ?? []}
        className="p-4"
        renderItem={({ item }) => <EntityItem entity={item} />}
      />
    </SafeAreaView>
  );
}

const EntityItem = ({ entity }: { entity: Entity }) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/entities/single",
          params: {
            entity: JSON.stringify(entity),
          },
        });
      }}
      className="my-2 p-4 bg-white rounded-lg"
    >
      <View className="flex-row justify-between">
        <View className="flex-row items-center shrink-0">
          <View className="flex items-center justify-center relative rounded-full h-12 w-12 bg-gray-900">
            <DynamicIcon
              name={entity.type.icon}
              className="w-4 h-4"
              color="white"
            />
          </View>
          <View className="ml-4">
            <Text className="text-lg font-medium">{entity.name}</Text>
            <Text className="text-sm text-gray-500">
              {entity.type.name} . {entity.rooms.length} room
            </Text>
          </View>
        </View>
        <View></View>
      </View>
    </Pressable>
  );
};
