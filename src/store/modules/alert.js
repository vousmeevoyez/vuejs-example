import Vue from "vue";

// export const state = {
//  type: null,
//  message: null
// };
//
/// / export const getters = {
/// /  access_token: state => state.access_token
/// / };
//
// export const mutations = {
//  SET_SUCCESS: (state, message) => {
//    state.type = "success";
//    state.message = message;
//  },
//  SET_ERROR: (state, message) => {
//    state.type = "error";
//    state.message = message;
//  },
//  SET_CLEAR: state => {
//    state.type = null;
//    state.message = null;
//  }
// };

export const actions = {
  triggerSuccess({ commit }, message) {
    const v = new Vue();
    v.$message({
      message: message,
      type: "success"
    });
  },
  triggerInfo({ commit }, message) {
    const v = new Vue();
    v.$message({
      message: message,
      type: "success",
      duration: 0,
      showClose: true
    });
  },
  triggerError({ commit }, message) {
    const v = new Vue();
    v.$message({
      message: message,
      type: "error"
    });
  }
};
