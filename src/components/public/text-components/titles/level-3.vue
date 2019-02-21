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
        color: #232f34;
        text-align: center;
        line-height: 1.4;
    }
</style>