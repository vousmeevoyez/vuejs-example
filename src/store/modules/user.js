import Vue from "vue";
import { getUserAPI } from "../../services";

export const state = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  image: null
};

export const getters = {
  userId: state => state.username,
  email: state => state.email,
  firstName: state => state.firstName,
  lastName: state => state.lastName,
  image: state => state.image
};

export const mutations = {
  SET_USER_ID: (state, userId) => {
    state.userId = userId;
    Vue.$cookies.set("userId", userId);
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
  SET_FIRST_NAME: (state, firstName) => {
    state.firstName = firstName;
  },
  SET_LAST_NAME: (state, lastName) => {
    state.lastName = lastName;
  },
  SET_IMAGE: (state, image) => {
    state.image = image;
  }
};

export const actions = {
  async getUserInfo({ commit }, userId) {
    return new Promise((resolve, reject) => {
      getUserAPI(userId)
        .then(({ data }) => {
          commit("SET_EMAIL", data.email);
          commit("SET_FIRST_NAME", data.first_name);
          commit("SET_LAST_NAME", data.last_name);
          commit("SET_IMAGE", data.image);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  }
};
