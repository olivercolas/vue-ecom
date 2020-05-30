<template>
  <v-app class="f-reg" :style="{ background: themeBg }">
    <app-bar />

    <v-content>
      <nuxt />
    </v-content>

    <cart />

    <snackbar />
    
    <message-dialog />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import AppBar from '~/components/AppBar.vue';
import Snackbar from '~/components/Snackbar.vue';
import Cart from '~/components/Cart.vue';
import MessageDialog from '~/components/MessageDialog.vue';
import Theme from '~/mixins/theme';

@Component({
  components: {
    AppBar,
    Snackbar,
    Cart,
    MessageDialog
  }
})
export default class Layout extends mixins(Theme) {
  mounted() {
    this.$store.dispatch('products/getProducts');
  }
}
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