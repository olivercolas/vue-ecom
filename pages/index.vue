<template>
  <div>
    <div class="grid-container">
      <div class="product">
        <img
          :src="selectedImage"
          class="product_image"
          v-resize="onResize"
          :style="{ height: adjustImageSize }"
        />
        <v-radio-group @change="onProductSKUChange" v-model="selectedSKU">
          <v-row align-content="center" justify="center">
            <v-radio
              color="#666"
              :ripple="false"
              class="radio-buttons"
              v-for="(variant, index) in productVal('variants')"
              :key="variant.sku"
              :label="variant.text"
              :value="index"
            ></v-radio>
          </v-row>
        </v-radio-group>
      </div>
      <link-list
        no-padding
        class="breadcrumbs"
        :links="productVal('breadcrumbs')"
        dot-separate
      />
      <h1 class="productTitle">{{ productVal('title') }}</h1>
      <p class="description">{{ productVal('description') }}</p>
      <cta :onClick="handleCtaClick" class="cta" :text="addToCartText" />
      <product-details class="details" :details="productVal('details')" />
      <logo class="logo" height="38px" width="100px" />
    </div>
    <div class="extra-space"></div>
  </div>
</template>

<script>
import Logo from '~/components/Logo';
import LinkList from '~/components/LinkList';
import ProductDetails from '~/components/ProductDetails';
import Cta from '~/components/Cta';
export default {
  components: {
    Logo,
    LinkList,
    ProductDetails,
    Cta
  },
  data() {
    return {
      selectedImage: '',
      selectedSKU: 0,
      windowSize: null
    };
  },
  computed: {
    product() {
      const val = this.$store.getters['products/getProductById']('0');
      return val ? val : {};
    },
    adjustImageSize() {
      if (this.windowSize > 640 && this.selectedSKU === 1) {
        return '400px';
      } else if (this.windowSize <= 640 && this.selectedSKU === 1) {
        return '262px';
      }
    },
    addToCartText() {
      if (Object.keys(this.product).length > 0) {
        const { currency, price } = this.product;
        const text = 'Add to your cart - ';
        if (currency && price) {
          switch (currency) {
            case 'GBP':
              return text + '£' + price;
            default:
              return text + '$' + price;
          }
        } else {
          return '';
        }
      }
    }
  },
  methods: {
    productVal(val) {
      if (this.product) {
        return this.product[val];
      }
    },
    onProductSKUChange(index) {
      if (this.product) {
        const { variants } = this.product;
        this.selectedImage = variants[index].image;
      }
    },
    onResize(event) {
      this.windowSize = window.innerWidth;
    },
    handleCtaClick(event) {
      this.$store
        .dispatch('cart/add', {
          ...this.product,
          sku: this.product.variants[this.selectedSKU].sku,
          quantity: 1
        })
        .then(added => {
          if (added) {
            this.$store.dispatch('snackbar/open', {
              message: `${this.product.title} added to the cart`,
              type: null
            });
          }
        });
    }
  },
  watch: {
    product(newVal) {
      if (this.selectedImage === '') {
        this.selectedImage = newVal.variants[0].image;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows:
    40px minmax(310px, auto) minmax(45px, auto) minmax(60px, auto)
    127px 250px;
  gap: 1px 1px;
  grid-template-areas:
    'breadcrumbs'
    'product'
    'productTitle'
    'description'
    'cta'
    'details';
  padding: 30px 20px;
}
.logo {
  display: none;
}
.productTitle {
  font-size: 1.8rem !important;
  line-height: 1.25;
  margin-top: 20px;
}
.description {
  line-height: 1.7;
  font-size: 1.2rem;
  margin-top: 20px;
  margin-bottom: 30px;
}
.product {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding-top: 40px;

  &_image {
    height: 200px;
  }
}

@media screen and (min-width: $sm) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(414px, auto) 45px 55px minmax(35px, auto) 100px 232px;
    gap: 1px 1px;
    grid-template-areas:
      'product product'
      'breadcrumbs .'
      'productTitle description'
      '. description'
      '. cta'
      '. details';
    padding: 113px 40px;
  }

  .logo {
    display: block;
    position: absolute;
    top: 98px;
    left: 40px;
    grid-area: product;
  }

  .productTitle {
    font-size: 1.9rem !important;
    line-height: 1.3;
    padding-right: 15px;
  }

  .description {
    margin-top: 0px;
    margin-bottom: 25px;
  }

  .product {
    padding-top: 0px;
    margin-bottom: 40px;

    &_image {
      height: 311px;
    }
  }
}
@media screen and (min-width: $lg) {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 0.9fr 1.1fr;
    grid-template-rows:
      45px minmax(50px, auto) minmax(50px, auto) minmax(232px, auto)
      minmax(60px, auto);
    gap: 1px 1px;
    grid-template-areas:
      'logo . breadcrumbs'
      '. . productTitle'
      'product product description'
      'product product details'
      'product product cta';
    padding: 100px 100px 0 40px;
  }

  .logo {
    position: initial;
    grid-area: logo;
  }
  .productTitle {
    font-size: 2rem !important;
    line-height: 1.33;
    margin: 15px 0;
    padding-right: 0px;
  }
  .description {
    line-height: 1.7;
    font-size: 1rem;
  }
  .cta {
    margin-top: 10px;
  }
  .product {
    margin-bottom: 0px;

    &_image {
      height: 289px;
    }
  }
}

.product {
  grid-area: product;
}
.breadcrumbs {
  grid-area: breadcrumbs;
}
.productTitle {
  grid-area: productTitle;
}
.description {
  grid-area: description;
}
.cta {
  grid-area: cta;
}
.details {
  grid-area: details;
}

.extra-space {
  margin-top: 40px;
  background-color: #f6f5e8;
  height: 500px;
}

.radio-buttons {
  margin-bottom: 0px !important;

  &:not(:last-child) {
    margin-right: 15px;
  }
}
</style>