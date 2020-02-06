export const state = {
  type: null,
  message: null
};

// export const getters = {
//  access_token: state => state.access_token
// };

export const mutations = {
  SET_SUCCESS: (state, message) => {
    state.type = "success";
    state.message = message;
  },
  SET_ERROR: (state, message) => {
    state.type = "error";
    state.message = message;
  },
  SET_CLEAR: state => {
    state.type = null;
    state.message = null;
  }
};

export const actions = {
  triggerSuccess({ commit }, message) {
    commit("SET_SUCCESS", message);
  },
  triggerError({ commit }, message) {
    commit("SET_ERROR", message);
  },
  triggerClear({ commit }) {
    commit("SET_CLEAR");
  }
};
