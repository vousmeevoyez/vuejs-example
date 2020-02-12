// AUTH STATE
//
import Vue from "vue";
import { fetchTokenAPI, registerUserAPI } from "../../services";
import { parseJwt, convertFullNameToFirstLastName } from "../../utility/utils";

export const state = {
  accessToken: ""
};

export const getters = {
  accessToken: state => state.accessToken
};

export const mutations = {
  SET_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token;
    Vue.$cookies.set("accessToken", token);
  }
};

export const actions = {
  authenticateUser({ commit }, formData) {
    return fetchTokenAPI(formData.username, formData.password)
      .then(({ data }) => {
        const tokenPayload = parseJwt(data.access);
        commit("SET_ACCESS_TOKEN", data.access);
        commit("SET_USER_ID", tokenPayload.user_id);
        return tokenPayload;
      })
      .catch(({ response }) => {
        return response.data;
      });
  },
  registerUser({ commit }, formData) {
    const converted = convertFullNameToFirstLastName(formData.fullName);
    return registerUserAPI(
      formData.email,
      converted.firstName,
      converted.lastName,
      formData.password,
      "USER",
      formData.username
    )
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        return response.data;
      });
  },
  logoutUser({ commit }) {
    commit("SET_ACCESS_TOKEN", "");
    Vue.$cookies.keys().forEach(cookie => Vue.$cookies.remove(cookie));
  }
};
