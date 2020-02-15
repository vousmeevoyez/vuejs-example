import { urls } from "./urls";
import http from "../utility/remoteCall";

export function getCardAPI(userId) {
  return http({
    url: urls["USER_CARD"] + "?user_id=" + userId,
    method: "GET"
  });
}
