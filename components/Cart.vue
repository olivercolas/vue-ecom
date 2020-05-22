<template>
  <div class="cart-container" v-resize="onResize">
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

      <div
        v-for="(item, index) of cartItems"
        :key="index"
        class="cart-item-row"
        :data-item="index+1"
        :style="{marginBottom: windowSize < 640 && index+1 === cartItems.length ? '250px' : 0}"
      >
        <div class="cart-item-title">{{item.title}}</div>
        <div class="cart-item-sku">{{getSkuText(item)}}</div>
        <div class="cart-item-amount">{{formattedPrice(item)}}</div>
        <button type="button" class="cart-item-remove" @click="handleRemoveItem(item)">Remove</button>
        <div class="cart-item-quantity">
          <v-select
            @change="handleUpdateQuantity($event, item)"
            class="cart-item-quantity_select"
            color="rgba(255, 254, 242, 0.1)"
            dark
            :items="quantities"
            :value="item.quantity"
            outlined
            :rounded="false"
            item-color="#F6F5E8"
            :menu-props="{ bottom: true, offsetY: false}"
          ></v-select>
        </div>
      </div>

      <div class="cart-checkout-cta">
        <p class="cart-checkout-cta_title">Enjoy complimentary shipping on all orders.</p>
        <v-row class="cart-row">
          <v-col class="cart-checkout-cta_subtotal-text">Subtotal (Tax Incl.)</v-col>
          <v-col class="cart-checkout-cta_subtotal">100.00</v-col>
        </v-row>
        <v-row class="cart-row">
          <cta
            :onClick="handleCtaClick"
            class="cta"
            text="Checkout"
            background-color="#EAEADF"
            color="#212121"
          />
        </v-row>
        <v-row class="cart-row">
          <ul class="payment-icons">
            <li style="display:inline-block;" v-for="icon of icons" :key="icon">
              <payment-icon :icon="icon" />
            </li>
          </ul>
        </v-row>
      </div>
      <div class="cart-delivery-info not-mobile-only">
        <p class="cart-delivery-info_title">Complimentary next business day delivery on all orders above £90.</p>
        <p class="cart-delivery-info_subtitle">Shipping to the United Kingdom.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Cta from "~/components/Cta";
import PaymentIcon from "~/components/PaymentIcon";
export default {
  components: {
    Cta,
    PaymentIcon
  },
  data() {
    return {
      quantities: [1, 2, 3, 4, 5],
      icons: ["visa", "mastercard", "paypal", "alipay"],
      windowSize: null
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters["cart/itemArray"];
    },
    cartLength() {
      return this.$store.getters["cart/itemArrayLength"];
    }
  },
  methods: {
    onResize(event) {
      this.windowSize = window.innerWidth;
    },
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
    },
    handleRemoveItem(item) {
      this.$store.dispatch("cart/remove", item);
    },
    handleUpdateQuantity(quantity, { sku }) {
      this.$store.dispatch("cart/updateQuantity", { sku, quantity });
    },
    handleCtaClick() {
      console.log("proceed to checkout");
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #333;
  color: white;
  overflow: auto;
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
  grid-template-rows: 30px minmax(40px, auto) 15px 16px 40px;
  grid-template-areas:
    ". . ."
    "cart-item-title cart-item-title cart-item-quantity"
    ". . ."
    "cart-item-sku cart-item-remove cart-item-amount"
    ". . .";

  border-bottom: 1px solid $cartBorderColor;
  padding-right: 20px;
}
.cart-item-remove,
.cart-item-sku {
  font-size: 0.8rem;
}
.cart-item-amount {
  font-size: 0.9rem;
  color: $cartSecondaryColor;
}

.cart-checkout-cta {
  position: fixed;
  left:0px;
  bottom: 0px;
  padding: 20px 20px;
  width: 100%;
  background-color: #333;
  border-top: 1px solid $cartBorderColor;
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
    align-items: center;
  }
  .cart-item-sku {
    font-size: 1.1rem;
  }
  .cart-item-amount {
    color: $cartPrimaryColor;
    font-size: 1.1rem;
  }

  .cart-checkout-cta {
    position: initial;
    bottom: initial;
    padding: 0px;
    &_title {
      margin-top: 70px;
    }

    border-top: 0;
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
  display: flex;
  justify-content: flex-end;
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
  max-width: 70px;
  display: flex;
  align-items: center;
  margin: 0;

  &_select {
    border-radius: 0px;
  }

  .v-select {
    color: $cartBorderColor;
  }
  .v-input__control {
    height: 55px;
  }
}

.cart-checkout-cta {
  grid-area: cart-checkout-cta;
  color: $cartSecondaryColor;

  &_title,
  &_subtotal-text {
    padding-left: 0px;
  }
  &_subtotal {
    color: $cartPrimaryColor;
    flex-grow: 0;
    font-size: 2rem;

    &-text {
      display: flex;
      align-items: center;
    }
  }
}
.payment-icons {
  display: flex;
  align-items: center;
  list-style-type: none;
  padding-left: 0px;
}

.cta {
  margin-bottom: 20px;
}
.cart-row {
  margin-right: 0px;
  margin-left: 0px;
}

.cart-delivery-info{
  
}
</style>