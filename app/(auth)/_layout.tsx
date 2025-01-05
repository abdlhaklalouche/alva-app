import { useAuth } from "@/context/authContext";
import { Redirect } from "expo-router";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  BuildingIcon,
  ChartAreaIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MonitorSpeakerIcon,
} from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import CurrentUser from "~/types/CurrentUser";
import { clearToken } from "~/utils/auth";
import * as Updates from "expo-updates";
import SocketProvider from "~/providers/SocketProvider";
import { PortalHost } from "@rn-primitives/portal";

export default function AuthLayout() {
  const { user } = useAuth();

  // @ts-ignore
  if (!user) return <Redirect href="/(guest)" />;

  return (
    <SocketProvider>
      <GestureHandlerRootView className="flex-1 bg-red-200">
        <Drawer
          drawerContent={(props) => (
            <CustomDrawerContent user={user} {...props} />
          )}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "Overview",
              drawerIcon: ({ color, size }) => (
                <HomeIcon color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="dashboard"
            options={{
              drawerLabel: "Dashboard",
              title: "Dashboard",
              drawerIcon: ({ color, size }) => (
                <LayoutDashboardIcon color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="insights"
            options={{
              drawerLabel: "Insights",
              title: "Insights",
              drawerIcon: ({ color, size }) => (
                <ChartAreaIcon color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="entities/index"
            options={{
              drawerLabel: "Entities",
              title: "Entities",
              drawerIcon: ({ color, size }) => (
                <BuildingIcon color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="entities/single"
            options={{ title: "Entity", drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="devices/index"
            options={{
              drawerLabel: "Devices",
              title: "Devices",
              drawerIcon: ({ color, size }) => (
                <MonitorSpeakerIcon color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="devices/single"
            options={{ title: "Device", drawerItemStyle: { display: "none" } }}
          />
        </Drawer>
        <PortalHost />
      </GestureHandlerRootView>
    </SocketProvider>
  );
}

type CustomDrawerContentProps = DrawerContentComponentProps & {
  user: CurrentUser;
};

function CustomDrawerContent(props: CustomDrawerContentProps) {
  const handleLogout = async () => {
    await clearToken();

    Updates.reloadAsync();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View className="py-10 flex flex-row items-center">
        <Image
          source={{
            uri: "https://media.licdn.com/dms/image/v2/D4D0BAQH0W52x_yZx9w/company-logo_200_200/company-logo_200_200/0/1723030167117/alvaas_logo?e=2147483647&v=beta&t=EFUCQ6psCaCOJhopYe3IvViR7lgbO2YlPILvSB7HDio",
          }}
          className="w-16 h-16 rounded-full mr-4"
        />
        <View>
          <Text className="text-lg font-bold">{props.user.name}</Text>
          <Text className="text-md">{props.user.email}</Text>
        </View>
      </View>

      <DrawerItemList {...props} />

      <View className="mt-auto py-2 px-1">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex flex-row items-center p-4 rounded-lg"
        >
          <LogOutIcon color="gray" size={20} />
          <Text className="text-md text-gray-700 ml-4">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
