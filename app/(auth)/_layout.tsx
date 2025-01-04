import { useAuth } from "@/context/authContext";
import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";

export default function AuthLayout() {
  const { user } = useAuth();

  if (!user) return <Redirect href="/(guest)" />;

  return <Stack />;
}
