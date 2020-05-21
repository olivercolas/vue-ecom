<template>
  <div class="grid-container">
    <div class="product">product</div>
    <div class="breadcrumbs">breadcrumbs</div>
    <div class="title">title</div>
    <div class="description">description</div>
    <div class="cta">cta</div>
    <div class="details">details</div>
    <logo class="logo" height="38px" width="100px" />
  </div>
</template>

<script>
import Logo from "~/components/Logo";
export default {
  components: {
    Logo
  },
  computed: {
    product() {
      return this.$store.getters["products/getProductById"]("0");
    }
  }
};
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 310px 45px 60px 127px 250px;
  gap: 1px 1px;
  grid-template-areas:
    "breadcrumbs"
    "product"
    "title"
    "description"
    "cta"
    "details";
  padding: 30px 20px;
}
.logo {
  display: none;
}
@media screen and (min-width: $sm) {
  .logo {
    display: block;
    position: absolute;
    top: 40px;
    left: 40px;
    grid-area: product;
  }

  .product {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 414px 45px 55px 35px 100px 232px;
    gap: 1px 1px;
    grid-template-areas:
      "product product"
      "breadcrumbs ."
      "title description"
      ". description"
      ". cta"
      ". details";
    padding: 100px 40px;
  }
}
@media screen and (min-width: $lg) {
  .logo {
    position: initial;
    grid-area: logo;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 0.6fr 1.4fr;
    grid-template-rows: 45px minmax(50px, auto) minmax(50px, auto) minmax(
        232px,
        auto
      ) minmax(60px, auto);
    gap: 1px 1px;
    grid-template-areas:
      "logo . breadcrumbs"
      "product product title"
      "product product description"
      "product product details"
      "product product details"
      "product product details"
      "product product cta";
    padding: 100px 100px 0 40px;
  }
}

.product {
  grid-area: product;
}
.breadcrumbs {
  grid-area: breadcrumbs;
}
.title {
  grid-area: title;
}
.description {
  grid-area: description;
}
.cta {
  grid-area: cta;
}
.details {
  grid-area: details;
}
</style>