import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NotFoundScreen from "../+not-found";
import { useGetInsights } from "~/api/insights";

export default function InsightsScreen() {
  const { data, isFetching, error } = useGetInsights({
    period: "month",
  });

  if (error || (!data && !isFetching)) return NotFoundScreen();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-4"
      ></ScrollView>
    </SafeAreaView>
  );
}
