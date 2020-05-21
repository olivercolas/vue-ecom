const DEFAULT_URL = axios => {
    return `${axios.defaults.baseURL}/products`
}

const productApiFactory = axios => ({
    getProducts() {
        return axios.get(DEFAULT_URL(axios))
    },
})

export default productApiFactory
