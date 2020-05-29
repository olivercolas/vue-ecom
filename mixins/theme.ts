import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Theme extends Vue {
  get themeBg() {
    return (this as any).$vuetify.theme.themes.light.background;
  }
}
