import Vue from "vue";
// import Moment from "moment";
import { getCardAPI } from "../../services";

export const state = {
  cards: [],
  categories: []
};

export const getters = {
  cards: state => state.cards,
  backlogs: state => state.backlogs,
  todos: state => state.todos,
  doings: state => state.doings,
  dones: state => state.dones,
  categories: state => state.categories
};

export const mutations = {
  SET_CATEGORIES: (state, quests) => {
    const result = [];
    for (const quest of quests) {
      for (const task of quest.tasks) {
        result.push({
          label: task.description,
          value: task.id,
          color: task.color
        });
      }
    }
    state.categories = result;
  },
  SET_CARDS: (state, cards) => {
    state.cards = cards;
  }
};

export const actions = {
  getUserCard({ commit }) {
    const userId = Vue.$cookies.get("userId");
    return new Promise((resolve, reject) => {
      getCardAPI(userId)
        .then(({ data }) => {
          commit("SET_CARDS", data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  }
};
