// AUTH STATE
//
import { fetchTokenAPI, registerUserAPI } from "../../services";
import { parseJwt, convertFullNameToFirstLastName } from "../../utility/utils";

export const state = {
  access_token: ""
};

export const getters = {
  access_token: state => state.access_token
};

export const mutations = {
  SET_ACCESS_TOKEN: (state, token) => {
    state.access_token = token;
  }
};

export const actions = {
  async authenticateUser({ commit }, formData) {
    return new Promise((resolve, reject) => {
      fetchTokenAPI(formData.username, formData.password)
        .then(({ data }) => {
          commit("SET_ACCESS_TOKEN", data.access);
          resolve(parseJwt(data.access));
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
  }
};
