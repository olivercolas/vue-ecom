import { ActionTree } from 'vuex';
import { CartState } from '~/models/Cart';
import { RootState } from '~/models/Store';

const dialogAttrs = {
  title: 'Maximum allowed quantity exceeded.',
  description: 'Our apologies, you have exceeded the maximum allowed quantity of this item.',
  link: { url: '#', text: 'Need assistance?' },
};

const actions: ActionTree<CartState, RootState> = {
  add({ commit, dispatch, getters }, payload) {
    const item = getters.hasItemInCart(payload.sku);
    if (item) {
      if (item.quantity < 5) {
        commit('INCREMENT_ITEM_IN_CART', payload);
      } else {
        dispatch('messageDialog/open', dialogAttrs, { root: true });
        return false;
      }
    } else {
      commit('ADD_ITEM_TO_CART', payload);
    }
    return true;
  },
  addSpecificQuantity({ state, commit }, payload) {
    commit('ADD_SPECIFIC_QUANTITY', payload);
  },
  remove({ state, commit }, payload) {
    const items = { ...state.items };
    delete items[payload.sku];
    if (Object.keys(items).length === 0) {
      commit('TOGGLE_CART');
    }
    commit('SET_CART', items);
  },
  toggleCart({ state, commit }) {
    if (!state.show && Object.keys(state.items).length === 0) {
      return false;
    } else {
      commit('TOGGLE_CART');
      return true;
    }
  },
};

export default actions;
