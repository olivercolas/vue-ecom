<template>
  <li>
    <div class="product-detail_title">{{title}}</div>
    <div>{{text}}</div>
  </li>
</template>

<script>
export default {
  props: {
    title: String,
    text: String
  }
};
</script>

<style lang="scss" scoped>
li {
  padding: 26px 0;
  border-bottom: 1px solid rgba(51, 51, 51, .2);

  &:last-child {
    border-bottom: 0;
  }
}
.product-detail_title {
  font-size: 1.0rem;
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