import {GetterTree} from 'vuex';
import { ProductState } from '~/models/Product';
import { RootState } from '~/models/Store';

const getters: GetterTree<ProductState, RootState> = {
    getProductById: state => (id: string) => {
        return state.list[id]
    },
}


export default getters;