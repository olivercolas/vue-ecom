<template>
  <li>
    <div class="product-detail_title">{{ title }}</div>
    <div>{{ text }}</div>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ProductDetail extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(String) readonly text!: string;
}
</script>

<style lang="scss" scoped>
li {
  padding: 26px 0;
  border-bottom: 1px solid rgba(51, 51, 51, 0.2);

  &:last-child {
    border-bottom: 0;
  }
}
.product-detail_title {
  font-size: 1rem;
  line-height: 1.7;
  font-family: 'Suisse Medium', sans-serif;
  font-weight: 600;
}
@media screen and (min-width: $sm) {
  li {
    padding: 14px 0;
  }
}
</style>