import { ActionTree } from 'vuex';
import { RootState } from '~/models/Store';
import { SnackbarState } from '~/models/Snackbar';

const actions: ActionTree<SnackbarState, RootState> = {
  open({ state, commit, dispatch }, { message, type }) {
    commit('SET_COLOR', type ? type : '');
    commit('SET_MESSAGE', message);
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

export default actions;