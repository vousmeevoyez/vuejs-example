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
  async authenticateUser({ commit }, formData) {
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
  async registerUser({ commit }, formData) {
    return new Promise((resolve, reject) => {
      const converted = convertFullNameToFirstLastName(formData.fullName);
      registerUserAPI(
        formData.email,
        converted.firstName,
        converted.lastName,
        formData.password,
        "USER",
        formData.username
      )
        .then(({ data }) => {
          resolve();
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  async logoutUser({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_ACCESS_TOKEN", "");
      Vue.$cookies.keys().forEach(cookie => Vue.$cookies.remove(cookie));
      resolve();
    });
  }
};
