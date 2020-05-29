import { MutationTree } from 'vuex';
import { set } from '~/utils/vuex';
import { SnackbarState } from '~/models/Snackbar';

const mutations: MutationTree<SnackbarState> = {
  SET_SHOW: set('show'),
  SET_COLOR: set('color'),
  SET_MESSAGE: set('message'),
};

export default mutations;
