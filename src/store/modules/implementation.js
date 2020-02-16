import Vue from "vue";
// import Moment from "moment";
import {
  getAllocationAPI,
  getCardAPI,
  createCardAPI,
  deleteCardAPI
} from "../../services";

export const state = {
  cards: [],
  categories: [],
  allocation: {}
};

export const getters = {
  cards: state => state.cards,
  categories: state => state.categories,
  allocation: state => state.allocation
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
  },
  SET_ALLOCATION: (state, allocations) => {
    // mutate the data according to library format
    let actuals = [];
    let targets = [];
    let labels = [];
    let colors = [];
    for (const allocation of allocations) {
      const noOfCards = allocation.no_of_cards;
      const noOfDoneCards = allocation.no_of_done_cards;
      let actual = 0;
      // prevent zero division
      if (noOfCards > 0) {
        actual = noOfDoneCards / noOfCards;
      }
      labels.push(allocation.description);
      targets.push(allocation.target);
      actuals.push(actual);
      colors.push(allocation.color);
    }
    state.allocation = {
      labels: labels,
      targets: targets,
      actuals: actuals,
      colors: colors
    };
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
  },
  createCard({ commit }, formData) {
    return new Promise((resolve, reject) => {
      const { taskId, description, dueDate, status } = formData;
      createCardAPI(taskId, description, dueDate, status)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  deleteCard({ commit }, cardId) {
    return new Promise((resolve, reject) => {
      deleteCardAPI(cardId)
        .then(() => {
          resolve();
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  getUserAllocation({ commit }) {
    const userId = Vue.$cookies.get("userId");
    return new Promise((resolve, reject) => {
      getAllocationAPI(userId)
        .then(({ data }) => {
          commit("SET_ALLOCATION", data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  }
};
