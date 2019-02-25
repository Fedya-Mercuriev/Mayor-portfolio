<template lang="pug">
    h2(:class="{'block-title-light': appearance === 'light', 'block-title-dark': appearance === 'dark'}")
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

    h2 {
        @include reset-pad-marg();
        margin-top: 20px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 1.4;
    }

    .block-title-light {
        color: $title-light-color;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding: 0 20px;
            font-size: 1.8em;
        }

        @media screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            padding: 0 35px;
            font-size: 3.3em;
        }
    }

    .block-title-dark {
        color: $title-dark-color;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding: 0 20px;
            font-size: 1.2em;
        }

        @media screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            padding: 0 35px;
            font-size: 3.3em;
        }
    }
</style>