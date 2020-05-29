import { GetterTree } from 'vuex';
import { CartState } from '~/models/Cart';
import { RootState } from '~/models/Store';

const getters: GetterTree<CartState, RootState> = {
  itemCount: (state) => {
    if (state.items && Object.keys(state.items).length > 0) {
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
  hasItemInCart: (state) => (id: string) => {
    if (state && state.items && state.items[id]) {
      return state.items[id];
    } else {
      return false;
    }
  },
  itemArray: (state) => {
    return state.items ? Object.keys(state.items).map((key) => state.items[key]) : [];
  },
  itemArrayLength: (state, getters) => {
    return getters.itemArray.length;
  },
};

export default getters;
