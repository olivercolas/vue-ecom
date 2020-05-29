import { set } from '~/utils/vuex';
import { MutationTree } from 'vuex';
import { MessageDialogState } from '~/models/MessageDialog';

const mutations: MutationTree<MessageDialogState> = {
  SET_SHOW: set('show'),
  SET_DIALOG(state, payload) {
    state.title = payload.title;
    state.description = payload.description;
    state.link = payload.link;
  },
};

export default mutations;
