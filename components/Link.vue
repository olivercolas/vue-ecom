<template>
    <a href="#" :style="{color: $vuetify.theme.themes.light.link}">{{text}}</a>
</template>

<script>
    export default {
        props: {
            text: String,
            url: String
        }
    }
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
    &::after{
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