<template lang="pug">
    div#app(ref="app")
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
        },
        methods: {
            controlScroll(block) {
                if (block) {
                    document.body.classList.add('block-scroll');
                } else {
                    document.body.classList.remove('block-scroll');
                }
            }
        }
    }
</script>