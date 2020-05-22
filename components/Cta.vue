<template>
  <button @click="onClick" type="button" :style="{backgroundColor, color}">{{text}}</button>
</template>

<script>
export default {
  props: {
    text: String,
    backgroundColor: String,
    color: String,
    onClick: Function
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