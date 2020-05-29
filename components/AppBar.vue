<template>
  <v-app-bar
    :absolute="!windowScrollYGreaterThanZero"
    :fixed="windowScrollYGreaterThanZero"
    elevation="0"
    hide-on-scroll
    height="80px"
    :style="{
      background: themeBg,
      borderBottom: appBarBorderBottom,
      transition: 'all 0.1s'
    }"
    v-scroll="onScrollSetYPosition"
  >
    <Logo class="mobile-only" />
    <LinkList class="not-mobile-only" :links="headerLinks.left" />
    <v-spacer />
    <LinkList class="not-mobile-only" :links="headerLinks.right" />
    <button
      type="button"
      class="open-cart"
      :data-count="cartCount"
      @click="handleCartClick"
    ></button>
    <v-app-bar-nav-icon
      class="mobile-only"
      @click.stop="drawer = !drawer"
      :style="{ marginLeft: '10px' }"
    />
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Getter } from 'vuex-class';
import Logo from '~/components/Logo.vue';
import LinkList from '~/components/LinkList.vue';
import Theme from '~/mixins/theme';

@Component({
  components: {
    Logo,
    LinkList
  }
})
export default class AppBar extends mixins(Theme) {
  @Getter('cart/itemCount') cartCount!: number;

  headerLinks = {
    left: [
      {
        text: 'Shop',
        url: ''
      },
      {
        text: 'Read',
        url: ''
      },
      {
        text: 'Stores',
        url: ''
      },
      {
        text: 'Search',
        url: ''
      }
    ],
    right: [
      {
        text: 'Login',
        url: ''
      }
    ]
  };

  windowScrollYGreaterThanZero = false;

  get appBarBorderBottom() {
    return this.windowScrollYGreaterThanZero ? '1px solid #dfded4' : '0px';
  }

  onScrollSetYPosition() {
    const scrollY =
      window.scrollY || document.getElementsByTagName('html')[0].scrollTop;
    if (scrollY > 0) {
      this.windowScrollYGreaterThanZero = true;
    } else {
      this.windowScrollYGreaterThanZero = false;
    }
  }

  handleCartClick() {
    this.$store.dispatch('cart/toggleCart').then(result => {
      if (!result) {
        this.$store.dispatch('snackbar/open', {
          message: 'You have no items in your cart',
          type: null
        });
      }
    });
  }
}
</script>