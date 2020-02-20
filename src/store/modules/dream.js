import Vue from "vue";
import { getRoadmapAPI } from "../../services";

export const state = {
  dreamId: null,
  url: null,
  roadmapId: null,
  quests: [],
  tasks: []
};

export const getters = {
  dreamId: state => state.dreamId,
  roadmapId: state => {
    let currentRoadmapId = state.roadmapId;
    if (currentRoadmapId === null) {
      currentRoadmapId = Vue.$cookies.get("roadmapId");
    }
    return currentRoadmapId;
  },
  url: state => state.url,
  quests: state => state.quests,
  tasks: state => state.tasks
};

export const mutations = {
  SET_DREAM_ID: (state, dreamId) => {
    state.dreamId = dreamId;
  },
  SET_DREAM_URL: (state, url) => {
    state.url = url;
  },
  SET_ROADMAP_ID: (state, roadmapId) => {
    state.roadmapId = roadmapId;
    Vue.$cookies.set("roadmapId", roadmapId);
  },
  SET_QUESTS: (state, quests) => {
    state.quests = quests;
  },
  SET_TASKS: (state, quests) => {
    const result = [];
    for (const quest of quests) {
      for (const task of quest.tasks) {
        result.push({
          id: task.id,
          popover: {
            label: task.description
          },
          bar: {
            color: task.color
          },
          dates: {
            start: task.start,
            end: task.end
          },
          status: task.status
        });
      }
    }
    state.tasks = result;
  }
};

export const actions = {
  getUserRoadmap({ commit, state }) {
    const roadmapId = state.roadmapId;
    return new Promise((resolve, reject) => {
      getRoadmapAPI(roadmapId)
        .then(({ data }) => {
          commit("SET_QUESTS", data.quests);
          commit("SET_TASKS", data.quests);
          commit("SET_CATEGORIES", data.quests);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  }
};
