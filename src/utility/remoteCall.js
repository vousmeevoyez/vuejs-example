// import Vue from "vue";
import axios from "axios";
import { urls } from "../services/urls";

const http = axios.create({
  baseURL: urls["BASE_URL"],
  timeout: 5000
});

http.interceptors.request.use(
  config => {
    // config.headers[
    //  "Authorization"
    // ] = `Bearer {Vue.$cookies.get("access_token")}`;
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
