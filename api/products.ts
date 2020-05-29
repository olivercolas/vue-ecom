import { AxiosInstance } from 'axios';

const DEFAULT_URL = (axios: AxiosInstance) => {
  return `${axios.defaults.baseURL}/products`;
};

const productApiFactory = (axios: AxiosInstance) => ({
  getProducts() {
    return axios.get(DEFAULT_URL(axios));
  },
});

export default productApiFactory;
