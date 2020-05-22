export const state = () => ({
    list: {},
    // selectedProduct: null,
})

export const mutations = {
    SET_PRODUCTS(state, payload) {
        state.list = payload
    },
    // SELECT_PRODUCT(state, payload) {
    //     state.selectedProduct = payload
    // },
}

export const getters = {
    getProductById: state => id => {
        return state.list[id]
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
