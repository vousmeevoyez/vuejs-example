import { urls } from "./urls";
import http from "../utility/remoteCall";

export function getUserAPI(userId) {
  return http({
    url: urls["USER"] + userId,
    method: "GET"
  });
}

export function getUsersAPI(userType) {
  return http({
    url: urls["USER"] + "?user_type=" + userType,
    method: "GET"
  });
}
