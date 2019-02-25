<template lang="pug">
    h3(:class="{'block-title-light': appearance === 'light', 'block-title-dark': appearance === 'dark'}")
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

    h3 {
        @include reset-pad-marg();
        margin-top: 20px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 1.5em;
        line-height: 1.4;
    }

    .block-title-light {
        color: $title-light-color;
    }

    .block-title-dark {
        color: $title-dark-color;
    }
</style>