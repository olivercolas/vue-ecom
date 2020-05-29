import { ActionTree } from 'vuex';
import { MessageDialogState } from '~/models/MessageDialog';
import { RootState } from '~/models/Store';

const actions: ActionTree<MessageDialogState, RootState> = {
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

export default actions;
