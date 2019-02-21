<template lang="pug">
    h1(:class="{'site-title-light': appearance === 'light', 'site-title-dark': appearance === 'dark'}") {{ text }}
</template>

<script>
    export default {
        props: {
            appearance: String,
            text: String
        }
    }
</script>

<style lang="scss" scoped>

    .site-title-light {
        color: $title-light-color;
    }

    .site-title-dark {
        color: $title-dark-color;
    }
</style>