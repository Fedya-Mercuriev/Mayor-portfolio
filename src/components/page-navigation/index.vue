<template lang="pug">
    div.page-navigation-wrapper
        site-logo
        page-navigation
</template>

<script>
    import PageNavigation from '../navbar-menu/index';

    export default {
        name: "navbar",
        data() {
            return {
                components: {
                    PageNavigation
                }
            }
        }
    }
</script>

<style scoped>

</style>