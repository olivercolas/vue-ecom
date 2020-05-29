import { ProductState } from "~/models/Product"

export const state: (() => ProductState) = () => ({
    list: {},
})

