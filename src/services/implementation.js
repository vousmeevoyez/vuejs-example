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

export function createCardAPI(taskId, description, status, dueDate) {
  let data = {
    description: description,
    task: taskId,
    due_date: dueDate,
    status: status
  };
  if (dueDate === "") {
    delete data.due_date;
  }
  return http({
    url: urls["USER_CARD"],
    method: "POST",
    data: data
  });
}

export function deleteCardAPI(cardId) {
  return http({
    url: urls["USER_CARD"] + cardId + "/",
    method: "DELETE"
  });
}

export function patchCardAPI(cardId, status) {
  return http({
    url: urls["USER_CARD"] + cardId + "/",
    method: "PATCH",
    data: {
      status: status
    }
  });
}

export function bulkPatchCardAPI(cardIds, status) {
  return http({
    url: urls["USER_BULK_PATCH_CARDS"],
    method: "PATCH",
    data: {
      cards: cardIds,
      status: status
    }
  });
}
