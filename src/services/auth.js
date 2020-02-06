import { urls } from "./urls";
import http from "../utility/remoteCall";

export function fetchTokenAPI(username, password) {
  return http({
    url: urls["GET_TOKEN"],
    method: "POST",
    data: {
      username: username,
      password: password
    }
  });
}

export function registerUserAPI(
  email,
  firstName,
  lastName,
  password,
  userType,
  username
) {
  return http({
    url: urls["REGISTER_USER"],
    method: "POST",
    data: {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      user_type: userType,
      username: username
    }
  });
}
