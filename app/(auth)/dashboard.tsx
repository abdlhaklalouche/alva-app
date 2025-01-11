import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Filters, { PeriodState } from "../components/blocks/filter";
import React from "react";
import { useGetDashboard } from "~/api/insights";
import NotFoundScreen from "../+not-found";
import DashboardChart from "../components/charts/dashboard";
import { Building, HomeIcon, MonitorSpeaker } from "lucide-react-native";
import { Text } from "~/components/ui/text";
import InsightsEntitiesChart from "../components/charts/insights-entities";
import InsightsDevicesChart from "../components/charts/insights-devices";
import { useSocket } from "~/context/socketContext";

export default function DashboardScreen() {
  const [period, setPeriod] = React.useState<PeriodState>("month");

  const { data, isFetching, isLoading, error, refetch } = useGetDashboard({
    period: period,
  });

  if (error || (!data && !isFetching)) return NotFoundScreen();

  const { socket } = useSocket();

  // Refetch dashboard if any change in data.
  socket?.on("dashboard_changed", () => refetch());

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="mb-4">
          <Filters
            period={period}
            handleSetPeriod={(period) => setPeriod(period)}
          />
        </View>
        <View className="w-full">
          <View className="flex-1 bg-white shadow-md rounded-lg flex-row items-center justify-center h-24 mb-8 font-medium gap-8 w-full">
            {isLoading ? (
              <View className="h-full flex justify-center items-center">
                <ActivityIndicator />
              </View>
            ) : (
              <>
                <View className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                  <Building
                    className="h-8 w-8 stroke-current transform transition-transform duration-500 ease-in-out"
                    color="white"
                  />
                </View>
                <View>
                  <Text className="text-2xl font-bold">
                    {data!.counts.entities}
                  </Text>
                  <Text className="text-sm text-gray-600">Entities</Text>
                </View>
              </>
            )}
          </View>
          <View className="flex-1 bg-white shadow-md rounded-lg flex-row items-center justify-center h-24 mb-8 font-medium gap-8 w-full">
            {isLoading ? (
              <View className="h-full flex justify-center items-center">
                <ActivityIndicator />
              </View>
            ) : (
              <>
                <View className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                  <HomeIcon
                    className="h-8 w-8 stroke-current text-white transform transition-transform duration-500 ease-in-out"
                    color="white"
                  />
                </View>
                <View>
                  <Text className="text-2xl font-bold">
                    {data!.counts.rooms}
                  </Text>
                  <Text className="text-sm text-gray-600">Rooms</Text>
                </View>
              </>
            )}
          </View>
          <View className="flex-1 bg-white shadow-md rounded-lg flex-row items-center justify-center h-24 mb-8 font-medium gap-8 w-full">
            {isLoading ? (
              <View className="h-full flex justify-center items-center">
                <ActivityIndicator />
              </View>
            ) : (
              <>
                <View className="flex justify-center items-center w-14 h-14 bg-black rounded-full">
                  <MonitorSpeaker
                    className="h-8 w-8 stroke-current text-white transform transition-transform duration-500 ease-in-out"
                    color="white"
                  />
                </View>
                <View>
                  <Text className="text-2xl font-bold">
                    {data!.counts.devices}
                  </Text>
                  <Text className="text-sm text-gray-600">Devices</Text>
                </View>
              </>
            )}
          </View>
        </View>
        <View className="mb-4">
          {isLoading ? (
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
          {isLoading ? (
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
          {isLoading ? (
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
