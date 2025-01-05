import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSearchParams } from "expo-router/build/hooks";
import Drawer from "expo-router/drawer";
import { TouchableOpacity, View } from "react-native";
import NotFoundScreen from "~/app/+not-found";
import { Text } from "~/components/ui/text";
import Entity from "~/types/Entity";

export default function EntityPage() {
  const searchParams = useSearchParams();

  const jsonEntity = searchParams.get("entity") ?? "";
  const entity: Entity = jsonEntity ? JSON.parse(jsonEntity) : null;

  if (!entity) return NotFoundScreen();

  return (
    <View>
      <Drawer.Screen
        name="entities/single"
        options={{
          title: entity.name,
          drawerItemStyle: { display: "none" },
          headerRight: () => (
            <View className="flex-row">
              <TouchableOpacity onPress={() => {}} className="mr-6">
                <MaterialIcons name="edit" size={24} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} className="mr-6">
                <MaterialIcons name="delete" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </View>
  );
}
