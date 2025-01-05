import Axios from "axios";
import { getToken } from "~/utils/auth";

const axios = Axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

axios.interceptors.request.use(async function (config) {
  const token = await getToken();

  config.headers.Authorization = token;

  return config;
});

export default axios;
