<template lang="pug">

    p(:class="{'block-description-light': appearance === 'light', 'block-description-dark': appearance === 'dark'}")
        slot
</template>

<script>
    export default {
        props: {
            appearance: String
        }
    }
</script>

<style lang="scss" scoped>

    p {
        @include reset-pad-marg();
        padding: 0 8px;
        margin-bottom: 30px;
        text-align: center;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding: 0 20px;
            font-size: 1.2em;
        }

        @media screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            padding: 0 35px;
        }
    }

    .block-description-light {
        color: $block-description-light-color;
    }

    .block-description-dark {
        color: $block-description-dark-color;
    }
</style>