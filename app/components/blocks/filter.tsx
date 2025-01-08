import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Text, View } from "react-native";

export type PeriodState = "week" | "month" | "year";

type PeriodItemProps = {
  name: string;
  state: PeriodState;
};

const filters: PeriodItemProps[] = [
  {
    name: "Last week",
    state: "week",
  },
  {
    name: "Last month",
    state: "month",
  },
  {
    name: "Last Year",
    state: "year",
  },
];

export default function Filters({
  period,
  handleSetPeriod,
}: {
  period: PeriodState;
  handleSetPeriod: (period: PeriodState) => void;
}) {
  return (
    <View className="flex-row text-sm text-gray-500 leading-none border border-gray-200 rounded-full p-1 bg-white w-[285px]">
      {filters.map((item) => (
        <Button
          key={item.state}
          variant="ghost"
          size="sm"
          className={cn(
            "inline-flex items-center gap-1 transition-colors duration-300 ease-in focus:outline-none hover:text-black focus:text-black hover:bg-transparent rounded-full px-4 py-2",
            period === item.state && "text-black bg-stone-100 hover:bg-stone-50"
          )}
          onPress={() => handleSetPeriod(item.state)}
        >
          <Text>{item.name}</Text>
        </Button>
      ))}
    </View>
  );
}