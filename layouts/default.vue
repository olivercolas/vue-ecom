<template>
  <v-app class="f-reg" :style="{background: themeBg}">
    <!-- <v-navigation-drawer
      v-model="drawer"
      fixed
      width="100%"
      top
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
    <v-app-bar
      :absolute="!windowScrollYGreaterThanZero"
      :fixed="windowScrollYGreaterThanZero"
      elevation="0"
      hide-on-scroll
      height="80px"
      :style="{background: themeBg, borderBottom: appBarBorderBottom, transition: 'all 0.1s'}"
      v-scroll="onScrollSetYPosition"
    >
      <logo class="mobile-only" />
      <link-list class="not-mobile-only" :links="headerLinks.left" />
      <v-spacer />
      <link-list class="not-mobile-only" :links="headerLinks.right" />
      <button type="button" class="open-cart" :data-count="cartCount" @click="handleCartClick"></button>
      <v-app-bar-nav-icon
        class="mobile-only"
        @click.stop="drawer = !drawer"
        :style="{marginLeft: '10px'}"
      />
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>

    <v-snackbar
      :value="snackBar"
      :multiLine="$store.state.snackbar.multiLine"
      :timeout="$store.state.snackbar.timeout"
      :bottom="$store.state.snackbar.bottom"
      :top="$store.state.snackbar.top"
      :vertical="$store.state.snackbar.vertical"
      :color="$store.state.snackbar.color !== '' ? $store.state.snackbar.color : null"
      @click="$store.dispatch('snackbar/close')"
    >
      <v-spacer></v-spacer>
      {{ $store.state.snackbar.message }}
    </v-snackbar>

    <v-dialog :value="showCart" fullscreen hide-overlay transition="slide-y-transition">
      <v-row justify="center" style="margin:0;">
        <cart />
      </v-row>
    </v-dialog>
  </v-app>
</template>

<script>
import Logo from "~/components/Logo";
import LinkList from "~/components/LinkList";
import Cart from "~/components/Cart";
export default {
  components: {
    Logo,
    LinkList,
    Cart
  },
  data() {
    return {
      headerLinks: {
        left: [
          {
            text: "Shop",
            url: ""
          },
          {
            text: "Read",
            url: ""
          },
          {
            text: "Stores",
            url: ""
          },
          {
            text: "Search",
            url: ""
          }
        ],
        right: [
          {
            text: "Login",
            url: ""
          }
        ]
      },
      drawer: false,
      windowScrollYGreaterThanZero: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      title: "Vuetify.js"
    };
  },
  mounted() {
    this.$store.dispatch("products/getProducts");
  },
  computed: {
    themeBg() {
      return this.$vuetify.theme.themes.light.background;
    },
    snackBar() {
      return this.$store.state.snackbar.show || false;
    },
    cartCount() {
      return this.$store.getters["cart/itemCount"];
    },
    showCart() {
      return this.$store.state.cart.show;
    },
    appBarBorderBottom() {
      return this.windowScrollYGreaterThanZero ? "1px solid #dfded4" : "0px"
    }
  },
  methods: {
    onScrollSetYPosition(event) {
      const scrollY =
        window.scrollY ||
        window.scrollTop ||
        document.getElementsByTagName("html")[0].scrollTop;
      if (scrollY > 0) {
        this.windowScrollYGreaterThanZero = true
      } else {
        this.windowScrollYGreaterThanZero = false
      }
    },
    handleCartClick() {
      this.$store.dispatch("cart/toggleCart").then(result => {
        if (!result) {
          this.$store.dispatch("snackbar/open", {
            message: "You have no items in your cart",
            type: null
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: "Suisse Regular", sans-serif;
}
.f-reg {
  font-family: "Suisse Regular", sans-serif;
}

input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none;
}
.mobile-only {
  display: block !important;
}
@media screen and (min-width: $sm) {
  .mobile-only {
    display: none !important;
  }
}
.not-mobile-only {
  display: none !important;
}
@media screen and (min-width: $sm) {
  .not-mobile-only {
    display: block !important;
  }
}
.v-label {
  color: #333 !important;
}
.v-snack__wrapper {
  position: fixed;
  width: 100vw;
  max-width: 100vw;
  top: 0px;
  left: 0px;
  border-radius: 0px;
  padding: 0 40px;
  height: 65px;
  font-size: 0.99rem;
  font-weight: 600;
}

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

  &[data-count="0"] {
    font-size: 0;
  }
  &[data-count="0"]::before {
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
    content: "";
    transform: none;
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &::after {
    content: attr(data-count);
    text-indent: 0;
  }
}
</style>