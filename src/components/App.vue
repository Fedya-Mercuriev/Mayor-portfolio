<template lang="pug">
    div#app
        Header
        main.main
            Portfolio
</template>

<script>
    import Header from './header/index.vue';
    import Portfolio from './main/portfolio/index.vue';

    export default {
        name: 'app',
        components: {
            Header,
            Portfolio
        }
    }
</script>