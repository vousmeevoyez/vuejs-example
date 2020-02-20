import Vue from "vue";
import {
  getSchedulesAPI,
  getAppointmentsAPI,
  createAppointmentAPI
} from "../../services";

export const state = {
  mentors: [],
  schedules: [],
  appointments: []
};

export const getters = {
  schedules: state => state.schedules,
  mentors: state => state.mentors,
  appointments: state => state.appointments
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
  },
  SET_APPOINTMENTS: (state, appointments) => {
    state.appointments = appointments;
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
  getAppointmentsAPI({ commit }, userId) {
    return new Promise((resolve, reject) => {
      getAppointmentsAPI(userId)
        .then(({ data }) => {
          commit("SET_SCHEDULES", data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  createAppointment({ commit }, scheduleId) {
    return new Promise((resolve, reject) => {
      const userId = Vue.$cookies.get("userId");
      createAppointmentAPI(userId, scheduleId)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  }
};
