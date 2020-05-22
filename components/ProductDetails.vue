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

<script>
import ProductDetail from "./ProductDetail";
export default {
  components: {
    ProductDetail
  },
  props: {
    details: Array
  }
};
</script>

<style lang="scss" scoped>
.product-details {
  border-top: 2px solid #333;
  list-style-type: none;
  padding-left: 0px;
}

</style>