<template lang="pug">
    div#app
        Header
</template>

<script>
    import Header from './header/index.vue';

    export default {
        name: 'app',
        components: {
            Header
        }
    }
</script>