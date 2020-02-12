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
  getUserInfo({ commit }, userId) {
    return getUserAPI(userId)
      .then(({ data }) => {
        commit("SET_EMAIL", data.email);
        commit("SET_FIRST_NAME", data.first_name);
        commit("SET_LAST_NAME", data.last_name);
        commit("SET_IMAGE", data.image);
        // profile information
        commit("SET_PROFILE_ID", data.profile.id);
        commit("SET_NORTH_STAR", data.profile.north_star);
        // diagnostic information
        commit("SET_DIAGNOSTIC_ID", data.diagnostic.id);
        commit("SET_DIAGNOSTIC_URL", data.diagnostic.url);
        // dream information
        commit("SET_DREAM_ID", data.dream.id);
        commit("SET_DREAM_URL", data.dream.url);
        // set roadmap id
        commit("SET_ROADMAP_ID", data.roadmap.id);
        return data;
      })
      .catch(({ response }) => {
        return response.data;
      });
  }
};
