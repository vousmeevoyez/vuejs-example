// import Vue from "vue";

export const state = {
  profileId: null,
  northStar: null
};

export const getters = {
  profileId: state => state.profileId,
  northStar: state => state.northStar
};

export const mutations = {
  SET_PROFILE_ID: (state, profileId) => {
    state.profileId = profileId;
  },
  SET_NORTH_STAR: (state, northStar) => {
    state.northStar = northStar;
  }
};

export const actions = {};
