<template>
  <a href="#" :style="{ color: $vuetify.theme.themes.light.link }">{{
    text
  }}</a>
</template>

<script lang="ts">
import  {Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Link extends Vue {
    @Prop(String) readonly text!: string;
    @Prop(String) readonly url!: string;
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  &::after {
    border-bottom: solid 1px #333;
    content: '';
    display: block;
    margin-top: -3px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 250ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  &:hover::after {
    transform: scaleX(1);
  }
}
</style>