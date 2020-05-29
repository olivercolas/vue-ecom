import { Product } from './Product';

export interface CartState {
  items: { [key: string]: CartProduct };
  show: boolean;
}

export interface CartProduct extends Product {
  quantity: number;
  sku: string;
}
