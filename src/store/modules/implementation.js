import Vue from "vue";
import {
  getAllocationAPI,
  getCardAPI,
  createCardAPI,
  deleteCardAPI,
  bulkPatchCardAPI
} from "../../services";
import { filterCards } from "../../utility/utils";

export const state = {
  backlogs: [],
  todos: [],
  doings: [],
  dones: [],
  categories: [],
  allocation: {}
};

export const getters = {
  backlogs: state => state.backlogs,
  todos: state => state.todos,
  doings: state => state.doings,
  dones: state => state.dones,
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
  SET_LOCAL_CARDS: (state, cards) => {
    state.backlogs = filterCards(cards, "b");
    state.todos = filterCards(cards, "t");
    state.doings = filterCards(cards, "dg");
    state.dones = filterCards(cards, "d");
  },
  SET_SERVER_CARDS: (state, cardInfo) => {
    // patch multiple cards to server
    let cards = cardInfo.cards;
    const cardIds = [];
    for (let card of cards) {
      cardIds.push(card.id);
    }
    bulkPatchCardAPI(cardIds, cardInfo.status)
      .then(data => {})
      .catch(({ response }) => {});
  },
  SET_BACKLOGS: (state, cards) => {
    state.backlogs = cards;
  },
  SET_TODOS: (state, cards) => {
    state.todos = cards;
  },
  SET_DOINGS: (state, cards) => {
    state.doings = cards;
  },
  SET_DONES: (state, cards) => {
    state.dones = cards;
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
          commit("SET_LOCAL_CARDS", data.results);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
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
