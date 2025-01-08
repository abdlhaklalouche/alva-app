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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    user: CurrentUser | null;
  }>({
    loaded: false,
    user: null,
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
    <AuthProvider user={state.user}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(guest)" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
};
