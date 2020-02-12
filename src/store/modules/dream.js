import Vue from "vue";
// import Moment from "moment";
import { getRoadmapAPI } from "../../services";
import { generateRandomColor } from "../../utility/utils";

export const state = {
  dreamId: null,
  url: null,
  roadmapId: null,
  quests: null,
  tasks: null
};

export const getters = {
  dreamId: state => state.dreamId,
  roadmapId: state => state.roadmapId,
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
        const color = generateRandomColor();
        result.push({
          id: task.id,
          popover: {
            label: task.description
          },
          bar: {
            color: color
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
  getUserRoadmap({ commit }, roadmapId) {
    return getRoadmapAPI(roadmapId)
      .then(({ data }) => {
        commit("SET_QUESTS", data.quests);
        commit("SET_TASKS", data.quests);
        return data;
      })
      .catch(({ response }) => {
        return response.data;
      });
  }
};
