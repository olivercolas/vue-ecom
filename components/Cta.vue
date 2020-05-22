<template>
  <button @click="onClick" type="button">Add to your cart - {{formattedPrice}}</button>
</template>

<script>
export default {
  props: {
    price: String,
    currency: String,
    onClick: Function
  },
  data() {
    return {
      updatedCurrency: "",
      updatedPrice: ""
    };
  },
  computed: {
    formattedPrice() {
      if (this.currency && this.price) {
        switch (this.currency) {
          case "GBP":
            return "£" + this.price;
          default:
            return "$" + this.price;
        }
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  height: 65px;
  min-width: 210px;
  padding: 21px 23px;
  color: white;
  background-color: #333;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Suisse Medium", sans-serif;
  font-size: 0.99rem;
  line-height: 1.1;
}
</style>