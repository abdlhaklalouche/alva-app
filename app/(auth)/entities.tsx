import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";

export default function EntitiesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View>
          <Text>Entities</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
