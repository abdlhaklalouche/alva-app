import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import NotFoundScreen from "../+not-found";
import { useGetInsights } from "~/api/insights";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import InsightsPredictionDeviceChart from "../components/charts/next-month-usage-device";
import InsightsPredictionOverallChart from "../components/charts/next-month-usage";

export default function InsightsScreen() {
  const { data, isFetching, isLoading, error } = useGetInsights({
    period: "month",
  });

  if (error || (!data && !isFetching)) return NotFoundScreen();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="h-full flex-col gap-6">
          <View className="flex flex-col w-full gap-6 pb-16">
            <View className="grow bg-white rounded-lg shadow-md h-96">
              <View className="p-2">
                <Text className="text-xs uppercase text-gray-600">
                  Next month energy usage prediction per device
                </Text>
              </View>
              <Separator />
              <View className="p-4">
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <View>
                    <InsightsPredictionDeviceChart data={data?.devices ?? []} />
                  </View>
                )}
              </View>
            </View>
            <View className="h-72 bg-white rounded-lg shadow-md">
              <View className="p-2">
                <Text className="text-xs uppercase text-gray-600">
                  Next month energy usage prediction
                </Text>
              </View>
              <Separator />
              <View className="p-2">
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <View>
                    <InsightsPredictionOverallChart
                      data={data?.overall ?? []}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
