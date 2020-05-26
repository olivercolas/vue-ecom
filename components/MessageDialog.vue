<template>
  <v-row justify="center" style="margin:0;">
    <v-card
      dark
      class="grid-container text-center"
      style="width: 100%;"
    >
      <div class="cart-exceed-close">cart-exceed-close</div>
      <div class="cart-exceed-icon">cart-exceed-icon</div>
      <div class="cart-exceed-title">cart-exceed-title</div>
      <div class="cart-exceed-message">cart-exceed-message</div>
      <div class="cart-exceed-question">cart-exceed-question</div>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MessageDialog extends Vue {
  @Prop(String) readonly title: string | undefined;
  @Prop(String) readonly description: string | undefined;
  @Prop(String) readonly link: string | undefined;
  @Prop(String) readonly icon: string | undefined;
}
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr minmax(20px, auto);
  grid-template-rows: 60px minmax(90px, auto) minmax(38px, auto) minmax(
      20px,
      auto
    );
  gap: 1px 1px;
  grid-template-areas:
    'cart-exceed-icon cart-exceed-close'
    'cart-exceed-title .'
    'cart-exceed-message .'
    'cart-exceed-question .';
}

.cart-exceed-close {
  grid-area: cart-exceed-close;
}

.cart-exceed-icon {
  grid-area: cart-exceed-icon;
}

.cart-exceed-title {
  grid-area: cart-exceed-title;
}

.cart-exceed-message {
  grid-area: cart-exceed-message;
}

.cart-exceed-question {
  grid-area: cart-exceed-question;
}
</style>