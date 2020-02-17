import { urls } from "./urls";
import http from "../utility/remoteCall";

export function getSchedulesAPI() {
  return http({
    url: urls["SCHEDULE"],
    method: "GET"
  });
}
