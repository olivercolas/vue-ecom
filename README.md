# vue-ecom

> Ecommerce layout based on aesop.com built on Vuejs & Nuxt

### Project features:
1) Immediately displays a product page
2) Product has 2 variations, each of which can be individually added to the cart
3) Cart items can be removed or updated
4) Cart can be displayed by clicking on the notification button on the top right
5) If a product varation is added past its threshold limit, app will display an error message.
6) Responsive through 3 breakpoints to support mobile, tablet and desktop 

### Technologies used:

1) **Sass**
2) **CSS Grids** see `Cart.vue`, `MessageDialog.vue`, and `index.vue`
3) **Typescript**
4) **Vuex** for state management
5) **Express** for api, see server  
6) **Jest** for tests, see `cart.mutations.test.ts`

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
