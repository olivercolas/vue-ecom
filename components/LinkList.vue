<template>
    <ul class="header-links">
        <li v-for="(link, index) in links" :key="index">
            <Link :text="link.text" :url="link.url" />
        </li>
    </ul>
</template>

<script>
    import Link from '~/components/Link';
    export default {
        components: {
            Link
        },
        props: {
            links: Array
        }
    }
</script>

<style lang="scss" scoped>
.header-links{
  list-style-type: none;
  li {
    display: inline-block;
    margin-right: 15px;
  }
}
</style>