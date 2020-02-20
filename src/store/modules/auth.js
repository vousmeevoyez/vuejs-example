// AUTH STATE
import Vue from "vue";
import { fetchTokenAPI, registerUserAPI } from "../../services";
import { parseJwt, convertFullNameToFirstLastName } from "../../utility/utils";

export const state = {
  accessToken: null
};

export const getters = {
  accessToken: state => {
    let currentAccessToken = state.accessToken;
    if (currentAccessToken === null) {
      currentAccessToken = Vue.$cookies.get("accessToken");
    }
    return currentAccessToken;
  }
};

export const mutations = {
  SET_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token;
    Vue.$cookies.set("accessToken", token);
  }
};

export const actions = {
  authenticateUser({ commit }, formData) {
    return new Promise((resolve, reject) => {
      fetchTokenAPI(formData.username, formData.password)
        .then(({ data }) => {
          const tokenPayload = parseJwt(data.access);
          commit("SET_ACCESS_TOKEN", data.access);
          commit("SET_USER_ID", tokenPayload.user_id);
          resolve(tokenPayload);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  registerUser({ commit }, formData) {
    const converted = convertFullNameToFirstLastName(formData.fullName);
    return new Promise((resolve, reject) => {
      registerUserAPI(
        formData.email,
        converted.firstName,
        converted.lastName,
        formData.password,
        "USER",
        formData.username
      )
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  logoutUser({ commit }) {
    commit("SET_ACCESS_TOKEN", "");
    Vue.$cookies.keys().forEach(cookie => Vue.$cookies.remove(cookie));
  }
};
