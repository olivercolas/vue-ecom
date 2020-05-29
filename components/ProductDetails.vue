<template>
  <ul class="product-details">
    <product-detail
      v-for="(detail, index) of details"
      :key="index"
      :title="detail.title"
      :text="detail.text"
    />
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ProductDetail from "./ProductDetail.vue";

@Component({
  components: {
    ProductDetail
  },
})
export default class ProductDetails extends Vue {
  @Prop(Array) readonly details!: [];
};
</script>

<style lang="scss" scoped>
.product-details {
  border-top: 2px solid #333;
  list-style-type: none;
  padding-left: 0px;
}

</style>