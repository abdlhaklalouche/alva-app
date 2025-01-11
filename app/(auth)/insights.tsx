import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NotFoundScreen from "../+not-found";
import { useGetInsights } from "~/api/insights";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";

export default function InsightsScreen() {
  const { data, isFetching, error } = useGetInsights({
    period: "month",
  });

  if (error || (!data && !isFetching)) return NotFoundScreen();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="h-full flex-col gap-6">
          <View className="flex-col min-h-96 w-full shrink-0 bg-white rounded-lg shadow-md">
            <View className="p-2">
              <Text className="text-xs uppercase text-gray-600">
                Top 10 consumming devices
              </Text>
            </View>
            <Separator />
            <View className="p-4"></View>
          </View>
          <View className="flex flex-col w-full gap-6 pb-16">
            <View className="grow bg-white rounded-lg shadow-md h-60">
              <View className="p-2">
                <Text className="text-xs uppercase text-gray-600">
                  Next week energy usage prediction per device
                </Text>
              </View>
              <Separator />
              <View className="p-4"></View>
            </View>
            <View className="h-60 bg-white rounded-lg shadow-md">
              <View className="p-2">
                <Text className="text-xs uppercase text-gray-600">
                  Next week energy usage prediction
                </Text>
              </View>
              <Separator />
              <View className="p-2"></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
