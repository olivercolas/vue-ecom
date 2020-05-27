import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Theme extends Vue {
  get themeBg() {
    return this.$vuetify.theme.themes.light.background;
  }
}
