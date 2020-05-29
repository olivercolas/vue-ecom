import { CartState } from '~/models/Cart';

export const state: (() => CartState) = () => ({
  items: {},
  show: false,
});
