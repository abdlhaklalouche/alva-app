import "../global.css";
import { useUsersActions } from "@/api/users";
import AuthProvider from "@/providers/AuthProvider";
import { clearToken, getToken } from "@/utils/auth";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import * as SplashScreen from "expo-splash-screen";
import CurrentUser from "@/types/CurrentUser";
import QueryProvider from "@/providers/QueryProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  registerForPushNotificationsAsync();

  return (
    <ThemeProvider value={DefaultTheme}>
      <QueryProvider>
        <SafeAreaProvider>
          <ProtectedLayout />
          <Toast />
        </SafeAreaProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

const ProtectedLayout = () => {
  const { check } = useUsersActions();

  const [state, setState] = React.useState<{
    loaded: boolean;
    token: string;
    user: CurrentUser | null;
  }>({
    loaded: false,
    user: null,
    token: "",
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();

        check(token ?? "", {
          onSuccess: (data) => {
            setState({
              loaded: true,
              user: data.data,
              token: token ?? "",
            });
          },
          onError: async () => {
            await clearToken();

            setState((prev) => ({
              ...prev,
              loaded: true,
            }));
          },
          onSettled: () => {
            SplashScreen.hideAsync();
          },
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loaded: true,
        }));

        await clearToken();

        SplashScreen.hideAsync();
      }
    };

    fetchUser();
  }, []);

  if (!state.loaded) return null;

  return (
    <AuthProvider user={state.user} token={state.token}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(guest)" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
};

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("alva", {
      name: "Alva application by abdelhak notifications channel",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  }
}
