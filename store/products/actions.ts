import { ActionTree } from 'vuex';
import { ProductState } from '~/models/Product';
import { RootState } from '~/models/Store';

const actions: ActionTree<ProductState, RootState> = {
  async getProducts({ commit }) {
    const res = await (this as any).$api.getProducts();
    const fixedRes: { [key: string]: any } = {};
    res.data.products.map((data: any) => {
      const id: string = data._id;
      fixedRes[id] = { ...data };
    });
    commit('SET_PRODUCTS', fixedRes);
  },
};

export default actions;
