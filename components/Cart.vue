<template>
  <div class="cart-container">
    <div class="grid-container" :data-items="cartLength">
      <div class="cart-title">Cart</div>
      <div class="cart-title-sku not-mobile-only">Size</div>
      <div class="cart-title-quantity not-mobile-only">Quantity</div>
      <div class="cart-title-empty cart-title-empty-1 not-mobile-only"></div>
      <div class="cart-title-empty cart-title-empty-2 not-mobile-only"></div>
      <div class="cart-title-empty cart-title-empty-3 not-mobile-only"></div>
      <div class="cart-close">
        <button type="button" @click="$store.dispatch('cart/toggleCart')">
          <svg class="Icon" role="img" viewBox="0 0 50 50">
            <g>
              <polygon points="50,5 45,0 25,20 5,0 0,5 20,25 0,45 5,50 25,30 45,50 50,45 30,25" />
            </g>
          </svg>
        </button>
      </div>

      <v-fade-transition v-for="(item, index) of cartItems" :key="index">
        <div class="cart-item-row" :data-item="index+1">
          <div class="cart-item-title">{{item.title}}</div>
          <div class="cart-item-sku">{{getSkuText(item)}}</div>
          <div class="cart-item-amount">{{formattedPrice(item)}}</div>
          <button type="button" class="cart-item-remove">Remove</button>
          <div class="cart-item-quantity">{{item.quantity}}</div>
        </div>
      </v-fade-transition>

      <div class="cart-checkout-cta">checkout-cta</div>
      <div class="cart-delivery-info not-mobile-only">delivery-info</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems() {
      return this.$store.getters["cart/itemArray"];
    },
    cartLength() {
      return this.$store.getters["cart/itemArrayLength"];
    }
  },
  methods: {
    formattedPrice(item) {
      if (item.currency && item.price) {
        switch (item.currency) {
          case "GBP":
            return "£" + item.price;
          default:
            return "$" + item.price;
        }
      } else {
        return "";
      }
    },
    getSkuText({ sku, variants }) {
      for (const variant of variants) {
        if (variant.sku === sku) {
          return variant.text;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-container {
  height: 100vh;
  width: 100vw;
  background-color: #333;
  color: white;
}
.grid-container {
  display: grid;
  grid-template-columns: 65px 1fr 70px;
  grid-template-rows: 47px minmax(151px, auto) 1fr;
  gap: 0px 0px;
  @for $i from 1 through 2 {
    &[data-items="#{$i}"] {
      $rows: null;
      @for $j from 1 through $i {
        $rows: $rows
          "cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j}";
      }
      grid-template-areas:
        "cart-title cart-title cart-close"
        $rows
        "cart-checkout-cta cart-checkout-cta cart-checkout-cta";
    }
  }

  grid-template-areas:
    "cart-title cart-title cart-close"
    "cart-item-row cart-item-row cart-item-row"
    "cart-checkout-cta cart-checkout-cta cart-checkout-cta";
  padding: 20px 0 0 20px;
}
.cart-close button {
  margin-right: 25px;
}
.cart-item-row {
  display: grid;
  grid-template-columns: 65px 1fr 70px;
  grid-template-rows: 30px 40px 15px 16px 40px;
  grid-template-areas:
    ". . ."
    "cart-item-title cart-item-title cart-item-quantity"
    ". . ."
    "cart-item-sku cart-item-remove cart-item-amount"
    ". . .";

  border-bottom: 1px solid $cartBorderColor;
}
.cart-item-remove,
.cart-item-sku {
  font-size: 0.8rem;
}

@media screen and (min-width: $sm) {
  .grid-container {
    display: grid;
    grid-template-columns: 1.9fr 1.1fr 0.6fr 1.2fr 0.6fr 0.9fr 0.8fr;
    grid-template-rows: minmax(40px, auto) minmax(60px, auto) 1fr;
    gap: 0px 0px;
    padding: 40px;

    @for $i from 1 through 2 {
      &[data-items="#{$i}"] {
        $rows: null;
        @for $j from 1 through $i {
          $rows: $rows
            "cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j}";
        }
        grid-template-areas:
          "cart-title cart-title-empty-1 cart-title-sku cart-title-empty-2 cart-title-quantity cart-title-empty-3 cart-close"
          $rows
          "cart-delivery-info cart-delivery-info cart-delivery-info cart-checkout-cta cart-checkout-cta cart-checkout-cta cart-checkout-cta";
      }
    }
  }

  .cart-item-row {
    display: grid;
    grid-template-columns: 1.9fr 1.1fr 0.6fr 1.2fr 0.9fr 0.6fr 0.8fr;
    grid-template-rows: 1fr;
    grid-template-areas: "cart-item-title . cart-item-sku . cart-item-quantity cart-item-remove cart-item-amount";
    padding: 20px 0;

    > div {
      display: flex;
      align-items: center;
    }

    .cart-item-amount {
      justify-content: flex-end;
    }
  }

  .cart-title-sku.not-mobile-only,
  .cart-title-quantity.not-mobile-only {
    display: flex !important;
  }

  .cart-close button {
    margin-right: 0px;
  }

  .cart-item-remove {
    font-size: 0.99rem;
  }
  .cart-item-sku {
    font-size: 1.1rem;
  }
}
@media screen and (min-width: $lg) {
  .grid-container {
    display: grid;
    grid-template-columns: 1.9fr 1.1fr 0.6fr 1.2fr 0.6fr 0.9fr 0.8fr;
    grid-template-rows: minmax(40px, auto) minmax(60px, auto) 1fr;
    gap: 0px 0px;
    @for $i from 1 through 2 {
      &[data-items="#{$i}"] {
        $rows: null;
        @for $j from 1 through $i {
          $rows: $rows
            "cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j}";
        }
        grid-template-areas:
          "cart-title cart-title-empty-1 cart-title-sku cart-title-empty-2 cart-title-quantity cart-title-empty-3 cart-close"
          $rows
          "cart-delivery-info . . . cart-checkout-cta cart-checkout-cta cart-checkout-cta";
      }
    }
    padding: 50px;
  }
  .cart-item-row {
    display: grid;
    grid-template-columns: 1.9fr 1.1fr 0.6fr 1.2fr 0.6fr 0.9fr 0.8fr;
    grid-template-rows: 1fr;
  }
}

.cart-delivery-info {
  grid-area: cart-delivery-info;
}

.cart-title {
  grid-area: cart-title;
}
.cart-title-sku {
  grid-area: cart-title-sku;
}
.cart-title-quantity {
  grid-area: cart-title-quantity;
}
.cart-item-row {
  grid-area: cart-item-row;
}
.cart-title {
  display: flex;
}
.cart-title-empty-1 {
  grid-area: cart-title-empty-1;
}
.cart-title-empty-2 {
  grid-area: cart-title-empty-2;
}
.cart-title-empty-3 {
  grid-area: cart-title-empty-3;
}
.cart-title,
.cart-title-sku,
.cart-title-quantity,
.cart-close,
.cart-title-empty {
  border-bottom: 2px solid $cartBorderColor;
  padding-bottom: 20px;
}
.cart-title,
.cart-title-sku.not-mobile-only,
.cart-title-quantity.not-mobile-only {
  align-items: center;
  font-size: 1.1rem;
  color: $cartSecondaryColor;
}
.cart-close {
  grid-area: cart-close;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    fill: $cartSecondaryColor;
    height: 19px;
    padding: 0 2px;
    width: 19px;
  }
}

.cart-item-row {
  @for $i from 1 through 2 {
    &[data-item="#{$i}"] {
      grid-area: cart-item-row-#{$i};
    }
  }
}

.cart-item-title,
.cart-item-amount,
.cart-item-quantity {
  color: $cartPrimaryColor;
}
.cart-item-sku,
.cart-item-remove {
  color: $cartSecondaryColor;
}
.cart-item-title {
  grid-area: cart-item-title;
  font-size: 1.1rem;
}
.cart-item-sku {
  grid-area: cart-item-sku;
}
.cart-item-amount {
  grid-area: cart-item-amount;
}
.cart-item-remove {
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  grid-area: cart-item-remove;

  &:hover {
    color: $cartPrimaryColor;
  }
}
.cart-item-quantity {
  grid-area: cart-item-quantity;
}

.cart-checkout-cta {
  grid-area: cart-checkout-cta;
}
</style>