<template>
  <v-dialog
    :value="showCart"
    fullscreen
    hide-overlay
    transition="slide-y-transition"
  >
    <v-row justify="center" style="margin:0;">
      <div class="cart-container" v-resize="onResize">
        <div class="grid-container" :data-items="cartLength">
          <div class="cart-title">Cart</div>
          <div class="cart-title-sku not-mobile-only">Size</div>
          <div class="cart-title-quantity not-mobile-only">Quantity</div>
          <div
            class="cart-title-empty cart-title-empty-1 not-mobile-only"
          ></div>
          <div
            class="cart-title-empty cart-title-empty-2 not-mobile-only"
          ></div>
          <div
            class="cart-title-empty cart-title-empty-3 not-mobile-only"
          ></div>
          <div class="cart-close">
            <button type="button" @click="$store.dispatch('cart/toggleCart')">
              <CloseIcon />
            </button>
          </div>

          <div
            v-for="(item, index) of cartItems"
            :key="index"
            class="cart-item-row"
            :data-item="index + 1"
            :style="{
              marginBottom:
                windowSize < 640 && index + 1 === cartItems.length ? '250px' : 0
            }"
          >
            <div class="cart-item-title">{{ item.title }}</div>
            <div class="cart-item-sku">{{ getSkuText(item) }}</div>
            <div class="cart-item-amount">
              {{ formatCurrency(item.currency, calcItemPrice(item)) }}
            </div>
            <button
              type="button"
              class="cart-item-remove"
              @click="handleRemoveItem(item)"
            >
              Remove
            </button>
            <div class="cart-item-quantity">
              <v-select
                @change="handleUpdateQuantity($event, item.sku)"
                class="cart-item-quantity_select"
                color="rgba(255, 254, 242, 0.1)"
                dark
                :items="quantities"
                :value="item.quantity"
                outlined
                :rounded="false"
                item-color="#F6F5E8"
                :menu-props="{ bottom: true, offsetY: false }"
              ></v-select>
            </div>
          </div>

          <div class="cart-checkout-cta">
            <p class="cart-checkout-cta__title">
              Enjoy complimentary shipping on all orders.
            </p>
            <v-row class="cart-row">
              <v-col class="cart-checkout-cta__subtotal-text"
                >Subtotal (Tax Incl.)</v-col
              >
              <v-col class="cart-checkout-cta__subtotal">{{
                getTotalPrice
              }}</v-col>
            </v-row>
            <v-row class="cart-row">
              <cta
                :onClick="handleCtaClick"
                class="cart-cta"
                text="Checkout"
                background-color="#EAEADF"
                color="#212121"
              />
            </v-row>
            <v-row class="cart-row">
              <ul class="cart-row__payment-icons">
                <li
                  style="display:inline-block;"
                  v-for="icon of icons"
                  :key="icon"
                >
                  <payment-icon :icon="icon" />
                </li>
              </ul>
            </v-row>
          </div>
          <div class="cart-delivery-info not-mobile-only">
            <p class="cart-delivery-info__title">
              Complimentary next business day delivery on all orders above £90.
            </p>
            <p class="cart-delivery-info__subtitle">
              Shipping to the United Kingdom.
            </p>
          </div>
        </div>
      </div>
    </v-row>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import Cta from '~/components/Cta.vue';
import PaymentIcon from '~/components/PaymentIcon.vue';
import CloseIcon from '~/components/CloseIcon.vue';
import { CartProduct } from '~/models/Cart';

@Component({
  components: {
    Cta,
    PaymentIcon,
    CloseIcon
  }
})
export default class Cart extends Vue {
  quantities = [1, 2, 3, 4, 5];
  
  icons = ['visa', 'mastercard', 'paypal', 'alipay'];

  windowSize = 0;

  @State(state => state.cart.show || false) showCart!: boolean;

  @Getter('cart/itemArray') cartItems!: CartProduct[];

  @Getter('cart/itemArrayLength') cartLength!: number;

  get getTotalPrice(): string {
    let count = 0;
    let currency = '';
    for (let i = 0; i < this.cartItems.length; i++) {
      const item = this.cartItems[i];

      if (i === 0) {
        currency = item.currency;
      }

      count += parseInt(this.calcItemPrice(item), 10);
    }
    return this.formatCurrency(currency, count.toFixed(2));
  }

  onResize(): void {
    this.windowSize = window.innerWidth;
  }

  calcItemPrice(item: CartProduct): string {
    return (parseInt(item.price, 10) * item.quantity).toFixed(2);
  }

  formatCurrency(currency: string, price: string): string {
    switch (currency) {
      case 'GBP':
        return '£' + price;
      default:
        return '$' + price;
    }
  }

  getSkuText(item: CartProduct): string {
    const { sku, variants } = item;
    for (const variant of variants) {
      if (variant.sku === sku) {
        return variant.text;
      }
    }
    return '';
  }

  handleRemoveItem(item: CartProduct): void {
    this.$store.dispatch('cart/remove', item);
  }

  handleUpdateQuantity(quantity: number, sku: string): void {
    this.$store.dispatch('cart/updateQuantity', { sku, quantity });
  }

  handleCtaClick(): void {
    console.log('proceed to checkout');
  }
}
</script>

<style lang="scss">
.cart-item-quantity {
  .v-input {
    height: 40px;
    &__control > div {
      min-height: 0 !important;
      height: 40px;
      padding-left: 16px !important;
    }
    &__append-inner {
      margin-top: 7px;
    }
  }
}
</style>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 65px 1fr 70px;
  grid-template-rows: 47px minmax(151px, auto) 1fr;
  gap: 0px 0px;
  @for $i from 1 through 2 {
    &[data-items='#{$i}'] {
      $rows: null;
      @for $j from 1 through $i {
        $rows: $rows
          'cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j}';
      }
      grid-template-areas:
        'cart-title cart-title cart-close'
        $rows
        'cart-checkout-cta cart-checkout-cta cart-checkout-cta';
    }
  }

  grid-template-areas:
    'cart-title cart-title cart-close'
    'cart-item-row cart-item-row cart-item-row'
    'cart-checkout-cta cart-checkout-cta cart-checkout-cta';
  padding: 20px 0 0 20px;
}

.cart {
  &-container {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: $cartBg;
    color: white;
    overflow: auto;
  }
  &-close {
    grid-area: cart-close;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      fill: $cartSecondaryColor;
      height: 19px;
      width: 19px;
      padding: 0 2px;
      margin-right: 25px;
    }
  }
  &-checkout-cta {
    position: fixed;
    left: 0px;
    bottom: 0px;
    padding: 20px 20px;
    width: 100%;
    background-color: #333;
    border-top: 1px solid $cartBorderColor;

    grid-area: cart-checkout-cta;
    color: $cartSecondaryColor;

    &__title,
    &__subtotal-text {
      padding-left: 0px;
    }
    &__subtotal {
      color: $cartPrimaryColor;
      flex-grow: 0;
      font-size: 2rem;

      &-text {
        display: flex;
        align-items: center;
      }
    }
  }
  &-delivery-info {
    grid-area: cart-delivery-info;
  }
  &-title {
    grid-area: cart-title;
    display: flex;

    $cartClasses: 'sku' 'quantity' 'empty-1' 'empty-2' 'empty-3';
    @each $class in $cartClasses {
      &-#{$class} {
        grid-area: cart-title-#{$class};
      }
    }

    &,
    &-sku.not-mobile-only,
    &-quantity.not-mobile-only {
      align-items: center;
      font-size: 1.1rem;
      color: $cartSecondaryColor;
    }
  }
  &-item {
    &-row {
      display: grid;
      grid-template-columns: 65px 1fr 70px;
      grid-template-rows: 30px minmax(40px, auto) 15px 16px 40px;
      grid-template-areas:
        '. . .'
        'cart-item-title cart-item-title cart-item-quantity'
        '. . .'
        'cart-item-sku cart-item-remove cart-item-amount'
        '. . .';

      border-bottom: 1px solid $cartBorderColor;
      padding-right: 20px;

      @for $i from 1 through 2 {
        &[data-item='#{$i}'] {
          grid-area: cart-item-row-#{$i};
        }
      }
    }

    &-amount {
      grid-area: cart-item-amount;

      font-size: 0.9rem;
      color: $cartSecondaryColor;

      display: flex;
      justify-content: flex-end;
    }

    &-title {
      grid-area: cart-item-title;
      font-size: 1.1rem;
    }
    &-sku {
      grid-area: cart-item-sku;
    }
    &-remove {
      display: flex;
      justify-content: flex-start;
      font-weight: 600;
      grid-area: cart-item-remove;

      &:hover {
        color: $cartPrimaryColor;
      }
    }
    &-quantity {
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

    &-remove,
    &-sku {
      font-size: 0.8rem;
      color: $cartSecondaryColor;
    }

    &-title,
    &-quantity {
      color: $cartPrimaryColor;
    }
  }
  &-cta {
    margin-bottom: 20px;
  }
  &-row {
    margin-right: 0px;
    margin-left: 0px;

    &__payment-icons {
      display: flex;
      align-items: center;
      list-style-type: none;
      padding-left: 0px;
    }
  }
}

.cart-title,
.cart-title-sku,
.cart-title-quantity,
.cart-title-empty,
.cart-close {
  border-bottom: 2px solid $cartBorderColor;
  padding-bottom: 20px;
}

@media screen and (min-width: $sm) {
  .grid-container {
    grid-template-columns: 1.9fr 1.1fr 0.6fr 1.2fr 0.6fr 0.9fr 0.8fr;
    grid-template-rows: minmax(40px, auto) minmax(60px, auto) 1fr;
    padding: 40px;

    @for $i from 1 through 2 {
      &[data-items='#{$i}'] {
        $rows: null;
        @for $j from 1 through $i {
          $rows: $rows
            'cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j}';
        }
        grid-template-areas:
          'cart-title cart-title-empty-1 cart-title-sku cart-title-empty-2 cart-title-quantity cart-title-empty-3 cart-close'
          $rows
          'cart-delivery-info cart-delivery-info cart-delivery-info cart-checkout-cta cart-checkout-cta cart-checkout-cta cart-checkout-cta';
      }
    }
  }

  .cart {
    &-item {
      &-row {
        grid-template-columns: 1.9fr 1.1fr 0.6fr 1.2fr 0.9fr 0.6fr 0.8fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'cart-item-title . cart-item-sku . cart-item-quantity cart-item-remove cart-item-amount';
        padding: 20px 0;

        > div {
          display: flex;
          align-items: center;
        }
      }

      &-remove {
        font-size: 0.99rem;
        align-items: center;
      }

      &-sku,
      &-amount {
        font-size: 1.1rem;
      }

      &-amount {
        color: $cartPrimaryColor;
      }
    }

    &-close button {
      margin-right: 0px;
    }

    &-checkout-cta {
      position: initial;
      bottom: initial;
      padding: 0px;
      &__title {
        margin-top: 70px;
      }

      border-top: 0;
    }

    &-delivery-info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-end;
      padding-right: 15px;
    }
  }

  .cart-title-sku.not-mobile-only,
  .cart-title-quantity.not-mobile-only,
  .cart-delivery-info {
    display: flex !important;
  }
}
@media screen and (min-width: $lg) {
  .grid-container {
    display: grid;
    grid-template-columns: 1.9fr 1.1fr 0.6fr 1.2fr 0.6fr 0.9fr 0.8fr;
    grid-template-rows: minmax(40px, auto) minmax(60px, auto) 1fr;
    gap: 0px 0px;
    @for $i from 1 through 2 {
      &[data-items='#{$i}'] {
        $rows: null;
        @for $j from 1 through $i {
          $rows: $rows
            'cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j} cart-item-row-#{$j}';
        }
        grid-template-areas:
          'cart-title cart-title-empty-1 cart-title-sku cart-title-empty-2 cart-title-quantity cart-title-empty-3 cart-close'
          $rows
          'cart-delivery-info . . . cart-checkout-cta cart-checkout-cta cart-checkout-cta';
      }
    }
    padding: 50px;
  }
  .cart-item-row {
    grid-template-columns: 1.9fr 1.1fr 0.6fr 1.2fr 0.6fr 0.9fr 0.8fr;
    grid-template-rows: 1fr;
  }
}
</style>