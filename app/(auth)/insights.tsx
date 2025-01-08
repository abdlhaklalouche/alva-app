import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Filters, { PeriodState } from "../components/blocks/filter";
import React from "react";
import NotFoundScreen from "../+not-found";
import { useGetInsights } from "~/api/insights";
import InsightsEntitiesChart from "../components/charts/insights-entities";
import DashboardChart from "../components/charts/dashboard";
import InsightsDevicesChart from "../components/charts/insights-devices";

export default function InsightsScreen() {
  const [period, setPeriod] = React.useState<PeriodState>("month");

  const { data, isFetching, error } = useGetInsights({
    period: period,
  });

  if (error || (!data && !isFetching)) return NotFoundScreen();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="mb-4">
          <Filters
            period={period}
            handleSetPeriod={(period) => setPeriod(period)}
          />
        </View>
        <View className="mb-4">
          {isFetching ? (
            <View className="flex justify-center items-center h-72 bg-white rounded-lg">
              <ActivityIndicator />
            </View>
          ) : (
            <View className="w-full bg-white rounded-lg p-2 py-6">
              <InsightsEntitiesChart data={data!.entities_consumption} />
            </View>
          )}
        </View>
        <View className="mb-4">
          {isFetching ? (
            <View className="flex justify-center items-center h-72 bg-white rounded-lg">
              <ActivityIndicator />
            </View>
          ) : (
            <View className="w-full bg-white rounded-lg p-2">
              <DashboardChart data={data!.consumption} />
            </View>
          )}
        </View>
        <View className="mb-4">
          {isFetching ? (
            <View className="flex justify-center items-center h-72 bg-white rounded-lg">
              <ActivityIndicator />
            </View>
          ) : (
            <View className="w-full bg-white rounded-lg p-2">
              <InsightsDevicesChart data={data!.devices_consumption} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
