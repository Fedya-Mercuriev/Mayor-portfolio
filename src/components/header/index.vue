<template lang="pug">
    header.page-header
        page-navigation
        div.page-header__inner
</template>

<script>
    import PageNavigation from './page-navigation/navbar/index.vue';

    export default {
        // name: "header",
        data() {
            return {

            }
        },
        components: {
            'page-navigation': PageNavigation
        }
    }
</script>

<style lang="scss" scoped>

    .page-header {
        padding-top: 60px;

        @media screen and (min-width: map-deep-get($devices, 'tablet')) {
            padding-top: 66px;
        }
    }
</style>