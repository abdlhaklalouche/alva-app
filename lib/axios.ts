import Axios from "axios";

const axios = Axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BACKEND_URL}/`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

export default axios;
