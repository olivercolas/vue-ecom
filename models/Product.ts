import Link from './Link';

export interface ProductDetail {
  title: string;
  text: string;
}
export interface ProductVariant {
  sku: string;
  text: string;
  image: string;
}
export interface Product {
  _id: string;
  breadcrumbs: Link[];
  title: string;
  description: string;
  details: ProductDetail[];
  price: string;
  currency: string;
  variants: ProductVariant[];
}