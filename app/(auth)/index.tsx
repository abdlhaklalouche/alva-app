import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/context/authContext";
import HomeInsightsChart from "../components/charts/home-insights";

const items: { title: string; url: any; icon: any }[] = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: "dashboard",
  },
  {
    title: "Insights",
    url: "insights",
    icon: "area-chart",
  },
  {
    title: "Entities",
    url: "entities",
    icon: "location-city",
  },
  {
    title: "Devices",
    url: "device",
    icon: "devices-other",
  },
];

export default function IndexScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="px-4 py-6 flex flex-col items-center justify-center bg-white rounded-lg">
          <Image
            source={{
              uri: "https://media.licdn.com/dms/image/v2/D4D0BAQH0W52x_yZx9w/company-logo_200_200/company-logo_200_200/0/1723030167117/alvaas_logo?e=2147483647&v=beta&t=EFUCQ6psCaCOJhopYe3IvViR7lgbO2YlPILvSB7HDio",
            }}
            className="w-20 h-20 rounded-full"
          />
          <View className="mt-4">
            <Text className="text-xl font-bold text-center">{user?.name}</Text>
            <Text className="text-md text-center">{user?.email}</Text>
          </View>
        </View>

        <View className="mt-5 mb-3">
          <HomeInsightsChart />
        </View>

        <View className="flex-row flex-wrap flex-1 -mx-2">
          {items.map((item, index) => (
            <HomeItem
              key={index}
              title={item.title}
              icon={item.icon}
              url={item.url}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const HomeItem = ({
  title,
  url,
  icon,
}: {
  title: string;
  url: any;
  icon: any;
}) => {
  return (
    <Pressable onPress={() => router.push(url)} className="p-2 w-1/2">
      <View className="px-4 py-6 flex flex-col items-center justify-center bg-white rounded-lg">
        <MaterialIcons name={icon} size={32} color="black" />
        <View className="mt-4">
          <Text className="text-md font-bold text-center">{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};
