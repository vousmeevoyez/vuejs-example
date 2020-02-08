// import Vue from "vue";

export const state = {
  diagnosticId: null,
  url: null
};

export const getters = {
  diagnosticId: state => state.diagnosticId,
  url: state => state.url
};

export const mutations = {
  SET_DIAGNOSTIC_ID: (state, diagnosticId) => {
    state.diagnosticId = diagnosticId;
  },
  SET_DIAGNOSTIC_URL: (state, url) => {
    state.url = url;
  }
};

export const actions = {};
