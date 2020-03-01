import {
  getSchedulesAPI,
  getAppointmentsAPI,
  createAppointmentAPI,
  deleteAppointmentAPI
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
  },
  RESET_MENTOR: state => {
    state.mentors = [];
    state.schedules = [];
    state.appointments = [];
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
  createAppointment({ commit }, appointmentInfo) {
    return new Promise((resolve, reject) => {
      // because backend only accept array we do append
      let userIds = [];
      userIds.push(appointmentInfo.userId);

      createAppointmentAPI(appointmentInfo.scheduleId, userIds)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  getAppointments({ commit }, userId) {
    return new Promise((resolve, reject) => {
      // because backend only accept array we do append
      getAppointmentsAPI(userId)
        .then(({ data }) => {
          commit("SET_APPOINTMENTS", data.results);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  },
  deleteAppointment({ commit }, appointmentId) {
    return new Promise((resolve, reject) => {
      // because backend only accept array we do append
      deleteAppointmentAPI(appointmentId)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response.data);
        });
    });
  }
};
