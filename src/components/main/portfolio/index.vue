<template lang="pug">
    div#portfolio
        h2.block-title Портфолио
        p.block-description Здесь собрана часть моих работ, которыми можно повыебываться
        div.project-cards-wrapper
</template>

<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
                projects: 4
            }
        }
    }
</script>

<style lang="scss" scoped>

    #portfolio {
        text-align: center;
    }

    .block-title {
        color: $block-title-color;
    }

    .block-description {
        color: $block-description-color;
    }

</style>