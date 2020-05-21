export const state = () => ({
    products: {},
    // selectedProduct: null,
})

export const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload
    },
    // SELECT_PRODUCT(state, payload) {
    //     state.selectedProduct = payload
    // },
}

export const getters = {
    getProductById: state => id => {
        return state.products[id]
    },
}

export const actions = {
    async getProducts({ commit }) {
        const res = await this.$api.getProducts()
        const fixedRes = {}
        res.data.products.map(data => {
            fixedRes[data._id] = { ...data }
        })
        commit('SET_PRODUCTS', fixedRes)
    }
}
