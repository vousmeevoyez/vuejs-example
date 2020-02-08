import { urls } from "./urls";
import http from "../utility/remoteCall";

export function getRoadmapAPI(roadmapId) {
  return http({
    url: urls["USER_ROADMAP"] + roadmapId + "/",
    method: "GET"
  });
}
