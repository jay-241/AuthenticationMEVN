import { createStore } from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const store = createStore({
  state: {
    user: null,
    notification: null,
  },
  getters: {
    isAuthenticated: state => !!state.user,
    user: state => state.user,
    notification: state => state.notification,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_NOTIFICATION(state, message) {
      state.notification = message;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/users/login', credentials);
        commit('SET_USER', response.data.user);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/users/register', userData);
        commit('SET_USER', response.data.user);
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    async forgetPassword({ commit }, email) {
      try {
        const response = await axios.post('/users/forgetpassword', { email });
        commit('SET_NOTIFICATION', response.data.msg);
      } catch (error) {
        console.error('Forget password error:', error);
        commit('SET_NOTIFICATION', 'Failed to send reset link.');
        throw error;
      }
    },
    async resetPassword({ commit }, { token, password }) {
        try {
          console.log("Token:"+token);
          console.log("Password:"+password);
          await axios.post('/users/resetpassword', { token, password });
          commit('SET_NOTIFICATION', 'Password reset successfully');
        } catch (error) {
          console.error('Reset password error:', error);
          commit('SET_NOTIFICATION', 'Failed to reset password');
          throw error;
        }
      },
    logout({ commit }) {
      commit('CLEAR_USER');
    }
  }
});

export default store;
