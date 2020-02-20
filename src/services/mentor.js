import { urls } from "./urls";
import http from "../utility/remoteCall";

export function getSchedulesAPI(mentorUserId) {
  return http({
    url: urls["SCHEDULE"] + "?mentor=" + mentorUserId,
    method: "GET"
  });
}

export function createAppointmentAPI(scheduleId, userId) {
  return http({
    url: urls["APPOINTMENT"],
    method: "POST",
    data: {
      schedule: scheduleId,
      mentees: userId
    }
  });
}

export function getAppointmentsAPI(userId) {
  return http({
    url: urls["APPOINTMENT"] + "?user_id=" + userId,
    method: "GET"
  });
}
