import { useAuth } from "@/context/authContext";
import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";

export default function GuestLayout() {
  const { user } = useAuth();

  // @ts-ignore
  if (user) return <Redirect href="/(auth)" />;

  return <Stack />;
}
