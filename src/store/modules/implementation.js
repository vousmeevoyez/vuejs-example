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
  SET_BACKLOGS: (state, cards) => {
    state.backlogs = filterCards(cards, "b");
  },
  SET_TODOS: (state, cards) => {
    state.todos = filterCards(cards, "t");
  },
  SET_DOINGS: (state, cards) => {
    state.doings = filterCards(cards, "dg");
  },
  SET_DONES: (state, cards) => {
    state.dones = filterCards(cards, "d");
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
  getUserCard({ commit }, userId) {
    return new Promise((resolve, reject) => {
      getCardAPI(userId)
        .then(({ data }) => {
          commit("SET_BACKLOGS", data.results);
          commit("SET_TODOS", data.results);
          commit("SET_DOINGS", data.results);
          commit("SET_DONES", data.results);
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
  getUserAllocation({ commit }, userId) {
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
  },
  updateCards({ commit }, cardInfo) {
    return new Promise((resolve, reject) => {
      let cards = cardInfo.cards;

      // convert attribute to status
      let status = "b";
      const attribute = cardInfo.attribute;
      if (attribute === "TODOS") {
        status = "t";
      } else if (attribute === "DOINGS") {
        status = "dg";
      } else if (attribute === "DONES") {
        status = "d";
      }
      // update acrd with right status
      const cardIds = [];
      for (let card of cards) {
        // extract only ids of every card
        card.status = status;
        cardIds.push(card.id);
      }

      bulkPatchCardAPI(cardIds, status)
        .then(data => {
          resolve(cards);
        })
        .catch(({ response }) => {
          reject(response.data);
        })
        .finally(() => {
          commit("SET_" + attribute, cards);
        });
    });
  }
};
