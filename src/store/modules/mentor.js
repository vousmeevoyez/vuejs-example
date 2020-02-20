import { getSchedulesAPI } from "../../services";

export const state = {
  mentors: [],
  schedules: []
};

export const getters = {
  schedules: state => state.schedules,
  mentors: state => state.mentors
};

export const mutations = {
  SET_SCHEDULES: (state, schedules) => {
    let result = [];
    for (const schedule of schedules) {
      result.push({
        id: schedule.id,
        start: schedule.start,
        end: schedule.end
      });
    }
    state.schedules = result;
  },
  SET_MENTORS: (state, mentors) => {
    state.mentors = mentors;
  }
};

export const actions = {
  getSchedules({ commit }, mentorUserId) {
    return new Promise((resolve, reject) => {
      getSchedulesAPI(mentorUserId)
        .then(({ data }) => {
          commit("SET_SCHEDULES", data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  resetSchedules({ commit }) {
    commit("SET_SCHEDULES", []);
  }
};
