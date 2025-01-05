import useQueryFetch from "@/hooks/useQueryFetch";
import Room from "~/types/Room";

export const entitiesKeys = {
  get: "entities",
};

// Fetch all rooms
export const useGetRooms = () => {
  const response = useQueryFetch<Room>({
    key: [entitiesKeys.get],
    path: `/rooms`,
    autoFetch: true,
    refetchOnWindowFocus: false,
  });

  return response;
};
