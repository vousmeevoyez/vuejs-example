import { urls } from "./urls";
import http from "../utility/remoteCall";

export function getCardAPI(userId) {
  return http({
    url: urls["USER_CARD"] + "?user_id=" + userId,
    method: "GET"
  });
}

export function getAllocationAPI(userId) {
  return http({
    url: urls["USER_ALLOCATION"] + "?user_id=" + userId,
    method: "GET"
  });
}

export function createCardAPI(taskId, description, dueDate, status) {
  return http({
    url: urls["USER_CARD"],
    method: "POST",
    data: {
      description: description,
      task: taskId,
      due_date: dueDate,
      status: status
    }
  });
}

export function deleteCardAPI(cardId) {
  return http({
    url: urls["USER_CARD"] + cardId + "/",
    method: "DELETE"
  });
}
