import { set } from '../utils/vuex';

export const state = () => ({
  show: false,
  title: '',
  description: '',
  link: {},
});

export const mutations = {
  SET_SHOW: set('show'),
  SET_DIALOG(state, payload) {
    state.title = payload.title;
    state.description = payload.description;
    state.link = payload.link;
  },
};
export const actions = {
  open({ state, commit, dispatch }, payload) {
    commit('SET_DIALOG', payload);
    if (state.show) {
      dispatch('close');
      setTimeout(() => {
        commit('SET_SHOW', true);
      }, 100);
    } else {
      commit('SET_SHOW', true);
    }
  },
  close({ commit }) {
    commit('SET_SHOW', false);
  },
};
