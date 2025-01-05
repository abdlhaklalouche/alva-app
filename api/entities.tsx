import useQueryFetch from "@/hooks/useQueryFetch";
import axios from "@/lib/axios";
import Entity from "@/types/Entity";
import EntityType from "@/types/EntityType";
import { useMutation } from "@tanstack/react-query";

type AddBody = {
  name: string;
  type_id: string;
  rooms: any[];
};

type UpdateBody = { id: string } & AddBody;

export const entitiesKeys = {
  get: "entities",
  add: "entities-add",
  update: "entities-update",
  delete: "entities-delete",

  get_types: "entities-types",
  save_types: "entities-types-save",
};

// Fetch all entities types
export const useGetEntitiesTypes = () => {
  const response = useQueryFetch<EntityType>({
    key: [entitiesKeys.get_types],
    path: `/entities/types`,
    autoFetch: true,
    refetchOnWindowFocus: false,
  });

  return response;
};

// Fetch all user entities
export const useGetEntities = () => {
  const response = useQueryFetch<Entity>({
    key: [entitiesKeys.get],
    path: `/entities/u`,
    autoFetch: true,
    refetchOnWindowFocus: false,
  });

  return response;
};

export const useEntitiesActions = () => {
  //Add entity
  const { mutate: addEntity, isPending: isAddingEntity } = useMutation({
    mutationKey: [entitiesKeys.add],
    mutationFn: async (data: AddBody) => {
      const response = await axios.put(`/entities/u`, data);

      return response.data;
    },
  });

  //Update entity
  const { mutate: updateEntity, isPending: isUpdatingEntity } = useMutation({
    mutationKey: [entitiesKeys.update],
    mutationFn: async (data: UpdateBody) => {
      const response = await axios.patch(`/entities/u/${data.id}`, data);

      return response.data;
    },
  });

  //Delete entity
  const { mutate: deleteEntities, isPending: isDeletingEntities } = useMutation(
    {
      mutationKey: [entitiesKeys.delete],
      mutationFn: async (data: any) => {
        const response = await axios.post(`/entities/u/delete`, data);

        return response.data;
      },
    }
  );

  return {
    addEntity,
    updateEntity,
    deleteEntities,
    isAddingEntity,
    isUpdatingEntity,
    isDeletingEntities,
  };
};
