<template>
  <ul class="header-links" :style="{padding: noPadding && '0px'}">
    <template v-for="(link, index) in links">
      <li :key="index">
        <Link :text="link.text" :url="link.url" />
      </li>
      <span
        :key="index + 'span'"
        v-if="dotSeparate && index < links.length-1"
        style="font-size: 0.35em;"
      >&#11044;</span>
    </template>
  </ul>
</template>

<script>
import Link from "~/components/Link";
export default {
  components: {
    Link
  },
  props: {
    links: Array,
    noPadding: Boolean,
    dotSeparate: Boolean
  }
};
</script>

<style lang="scss" scoped>
.header-links {
  display: flex;
  align-items: center;
  list-style-type: none;
  li {
    display: inline-block;
    margin: 0 15px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>