<template lang="pug">
    header.page-header
        Navbar
        div.page-header__inner
</template>

<script>
    import Navbar from './page-navigation/navbar/index.vue';

    export default {
        // name: "header",
        data() {
            return {

            }
        },
        components: {
            Navbar
        }
    }
</script>

<style scoped>

</style>