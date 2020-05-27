import { set } from '../utils/vuex';

export const state = () => ({
  items: {},
  show: false,
});

export const getters = {
  itemCount: (state) => {
    if (Object.keys(state.items).length > 0) {
      let count = 0;
      for (const key in state.items) {
        if (state.items.hasOwnProperty(key)) {
          const item = state.items[key];
          count = count + item.quantity;
        }
      }
      return count;
    } else {
      return 0;
    }
  },
  hasItemInCart: (state) => (id) => {
    if (state.items[id]) {
      return state.items[id];
    } else {
      return false;
    }
  },
  itemArray: (state) => {
    return Object.keys(state.items).map((key) => state.items[key]);
  },
  itemArrayLength: (state, getters) => {
    return getters.itemArray.length;
  },
};

export const mutations = {
  ADD_ITEM_TO_CART(state, payload) {
    this._vm.$set(state.items, payload.sku, payload);
  },
  INCREMENT_ITEM_IN_CART(state, payload) {
    const quantity = state.items[payload.sku].quantity + 1;
    this._vm.$set(state.items, payload.sku, { ...payload, quantity });
  },
  DECREMENT_ITEM_IN_CART(state, payload) {
    const quantity = state.items[payload.sku].quantity - 1;
    this._vm.$set(state.items, payload.sku, { ...payload, quantity });
  },
  SET_CART: set('items'),
  TOGGLE_CART(state, payload) {
    state.show = !state.show;
  },
  UPDATE_ITEM_IN_CART(state, { sku, quantity }) {
    const items = { ...state.items };
    items[sku].quantity = quantity;
    state.items = items;
  },
};

export const actions = {
  add({ commit, dispatch, getters }, payload) {
    const item = getters.hasItemInCart(payload.sku);
    if (item) {
      if (item.quantity < 5) {
        commit('INCREMENT_ITEM_IN_CART', payload);
      } else {
        const dialogAttrs = {
          title: 'Maximum allowed quantity exceeded.',
          description: 'Our apologies, you have exceeded the maximum allowed quantity of this item.',
          link: { url: '#', text: 'Need assistance?' },
        };
        dispatch('messageDialog/open', dialogAttrs, { root: true });
        return false;
      }
    } else {
      commit('ADD_ITEM_TO_CART', payload);
    }
    return true;
  },
  updateQuantity({ state, commit }, payload) {
    commit('UPDATE_ITEM_IN_CART', payload);
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
