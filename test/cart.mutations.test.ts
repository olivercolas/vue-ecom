import mutations from '~/store/cart/mutations';
import { CartState, CartProduct } from '~/models/Cart';
import defaultProduct from '~/utils/defaultProduct';

const {
  ADD_ITEM_TO_CART,
  INCREMENT_ITEM_IN_CART,
  DECREMENT_ITEM_IN_CART,
  SET_CART,
  TOGGLE_CART,
  ADD_SPECIFIC_QUANTITY,
} = mutations;

const defaultItem: CartProduct = {
  ...defaultProduct,
  sku: defaultProduct.variants[0].sku,
  quantity: 1,
};

const altItem: CartProduct = { ...defaultItem, sku: defaultItem.variants[1].sku };

const initialState: CartState = {
  items: {
    [defaultItem.sku]: defaultItem,
  },
  show: false,
};

describe('mutations test', () => {
  let state: CartState;

  beforeEach(() => {
    state = initialState;
  });

  it('should add a new item', () => {
    ADD_ITEM_TO_CART(state, altItem);

    expect(Object.keys(state).length).toEqual(2);
  });

  it(`should increment an item's quantity`, () => {
    ADD_SPECIFIC_QUANTITY(state, { sku: defaultItem.sku, quantity: 4 });

    expect(state.items.Cleanser100mL.quantity).toEqual(4);
  });

  it(`should decrement an item's quantity`, () => {
    state.items.Cleanser100mL.quantity = 4;
    DECREMENT_ITEM_IN_CART(state, defaultItem);

    expect(state.items.Cleanser100mL.quantity).toEqual(3);
  });

  it(`should set the cart's items to the supplied object`, () => {
    SET_CART(state, { Cleanser200mL: altItem });

    const newItemSkuName = Object.keys(state.items)[0];
    expect(newItemSkuName).toEqual('Cleanser200mL');
  });

  it(`should set the cart's show value to true`, () => {
    TOGGLE_CART(state);
    expect(state.show).toEqual(true);
  });

  it(`should set a specific item's quantity to the supplied value`, () => {
    ADD_SPECIFIC_QUANTITY(state, { sku: 'Cleanser200mL', quantity: 3 });
    expect(state.items.Cleanser200mL.quantity).toEqual(3);
  });
});
