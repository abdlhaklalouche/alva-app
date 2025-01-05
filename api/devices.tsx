import useQueryFetch from "@/hooks/useQueryFetch";
import axios from "@/lib/axios";
import Device from "@/types/Device";
import { useMutation } from "@tanstack/react-query";
import { DeviceStatus } from "~/enums/DeviceStatus";

type AddBody = {
  name: string;
  status: DeviceStatus;
  room_id: string;
  energies: any[];
};

type UpdateBody = { id: string } & AddBody;

export const devicesKeys = {
  get: "devices",
  add: "devices-add",
  update: "devices-update",
  delete: "devices-delete",
};

// Fetch all user devices
export const useGetDevices = () => {
  const response = useQueryFetch<Device>({
    key: [devicesKeys.get],
    path: `/devices/u`,
    autoFetch: true,
    refetchOnWindowFocus: false,
  });

  return response;
};

export const useDevicesActions = () => {
  //Add device
  const { mutate: addDevice, isPending: isAddingDevice } = useMutation({
    mutationKey: [devicesKeys.add],
    mutationFn: async (data: AddBody) => {
      const response = await axios.put(`/devices/u`, data);

      return response.data;
    },
  });

  //Update device
  const { mutate: updateDevice, isPending: isUpdatingDevice } = useMutation({
    mutationKey: [devicesKeys.update],
    mutationFn: async (data: UpdateBody) => {
      const response = await axios.patch(`/devices/u/${data.id}`, data);

      return response.data;
    },
  });

  //Delete device
  const { mutate: deleteDevices, isPending: isDeletingDevices } = useMutation({
    mutationKey: [devicesKeys.delete],
    mutationFn: async (data: any) => {
      const response = await axios.post(`/devices/u/delete`, data);

      return response.data;
    },
  });

  return {
    addDevice,
    updateDevice,
    deleteDevices,
    isAddingDevice,
    isUpdatingDevice,
    isDeletingDevices,
  };
};
