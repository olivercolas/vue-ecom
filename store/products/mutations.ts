import { MutationTree } from 'vuex';
import { ProductState } from '~/models/Product';

const mutations: MutationTree<ProductState> = {
  SET_PRODUCTS(state, payload) {
    state.list = payload;
  },
};

export default mutations;
