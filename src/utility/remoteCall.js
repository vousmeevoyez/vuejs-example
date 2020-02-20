import axios from "axios";
import store from "../store";
import { urls } from "../services/urls";

const http = axios.create({
  baseURL: urls["BASE_URL"],
  timeout: 5000
});

http.interceptors.request.use(
  config => {
    const accessToken = store.getters["accessToken"];
    if (accessToken !== null) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["Access-Control-Allow-Headers"] =
    //  "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default http;
