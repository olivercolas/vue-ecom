<template>
  <v-app class="f-reg" :style="{ background: themeBg }">
    <app-bar />

    <v-content>
      <nuxt />
    </v-content>

    <snackbar />

    <v-dialog
      :value="showCart"
      fullscreen
      hide-overlay
      transition="slide-y-transition"
    >
      <v-row justify="center" style="margin:0;">
        <cart />
      </v-row>
    </v-dialog>

    <message-dialog
      icon="mdi-information-outline"
      title="cart-exceed-title"
      description="cart-exceed-message"
      :link="{ url: '#', text: 'card-exceed-question' }"
    />
  </v-app>
</template>

<script>
import AppBar from '~/components/AppBar';
import Snackbar from '~/components/Snackbar';
import Cart from '~/components/Cart';
import MessageDialog from '~/components/MessageDialog';
export default {
  components: {
    AppBar,
    Snackbar,
    Cart,
    MessageDialog
  },
  mounted() {
    this.$store.dispatch('products/getProducts');
  },
  computed: {
    themeBg() {
      return this.$vuetify.theme.themes.light.background;
    },
    showCart() {
      return this.$store.state.cart.show;
    }
  }
};
</script>

<style lang="scss">
.open-cart {
  display: block;
  height: 26px;
  width: 26px;
  line-height: 26px;
  margin: 0 0 0 25px;
  padding: 0;
  position: relative;
  font-size: 0.8em;
  color: white;

  &[data-count='0'] {
    font-size: 0;
  }
  &[data-count='0']::before {
    transform: scale(0.3);
  }
  &::before,
  &::after {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  &::before {
    background-color: #252525;
    border-radius: 100%;
    content: '';
    transform: none;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &::after {
    content: attr(data-count);
    text-indent: 0;
  }
}
</style>