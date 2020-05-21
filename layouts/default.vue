<template>
  <v-app :style="{background: themeBg}">
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
      fixed
      app
      elevation="0"
      hide-on-scroll
      height="80px"
      :style="{background: themeBg, borderBottom: appBarBorderBottom, transition: 'all 0.1s'}"
      v-scroll="onScroll"
    >
      <logo class="mobile-only" />
      <link-list class="not-mobile-only" :links="headerLinks.left" />
      <v-spacer />
      <link-list class="not-mobile-only" :links="headerLinks.right" />
      <button type="button" class="open-cart" data-count="0"></button>
      <v-app-bar-nav-icon
        class="mobile-only"
        @click.stop="drawer = !drawer"
        :style="{marginLeft: '10px'}"
      />
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Logo from "~/components/Logo";
import LinkList from "~/components/LinkList";
export default {
  components: {
    Logo,
    LinkList
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
      title: "Vuetify.js",
      appBarBorderBottom: "0px"
    };
  },
  async fetch({ store }) {
      await store.dispatch('products/getProducts')
  },
  computed: {
    themeBg() {
      return this.$vuetify.theme.themes.light.background;
    }
  },
  methods: {
    onScroll(event) {
      const scrollY =
        window.scrollY ||
        window.scrollTop ||
        document.getElementsByTagName("html")[0].scrollTop;
      if (scrollY > 0) {
        this.appBarBorderBottom = "1px solid #dfded4";
      } else {
        this.appBarBorderBottom = "0px";
      }
    }
  }
};
</script>

<style lang="scss">
input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none;
}
.mobile-only {
  display: block;
}
@media screen and (min-width: $sm) {
  .mobile-only {
    display: none;
  }
}
.not-mobile-only {
  display: none;
}
@media screen and (min-width: $sm) {
  .not-mobile-only {
    display: block;
  }
}

.open-cart {
  display: block;
  height: 26px;
  width: 26px;
  line-height: 26px;
  margin: 0 0 0 5px;
  padding: 0;
  position: relative;
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