import Vue from 'vue';
import { MutationTree } from 'vuex';
import { CartState } from '~/models/Cart';
import { set } from '~/utils/vuex';

const mutations: MutationTree<CartState> = {
  ADD_ITEM_TO_CART(state, payload) {
    Vue.set(state.items, payload.sku, payload);
  },
  INCREMENT_ITEM_IN_CART(state, payload) {
    const quantity = state.items[payload.sku].quantity + 1;
    Vue.set(state.items, payload.sku, { ...payload, quantity });
  },
  DECREMENT_ITEM_IN_CART(state, payload) {
    const quantity = state.items[payload.sku].quantity - 1;
    Vue.set(state.items, payload.sku, { ...payload, quantity });
  },
  SET_CART: set('items'),
  TOGGLE_CART(state, payload) {
    state.show = !state.show;
  },
  ADD_SPECIFIC_QUANTITY(state, { sku, quantity }) {
    const items = { ...state.items };
    items[sku].quantity = quantity;
    state.items = items;
  },
};

export default mutations;
