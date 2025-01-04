import * as SecureStore from "expo-secure-store";

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (error) {
    return null;
  }
};

export const storeToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
};

export const clearToken = async () => {
  await SecureStore.deleteItemAsync("token");
};
