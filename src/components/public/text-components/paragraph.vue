<template lang="pug">
    p(:class="{'paragraph-light': appearance === 'light', 'paragraph-dark': appearance === 'dark'}")
        slot
</template>

<script>
    export default {
        name: "paragraph",
        props: {
            text: String,
            appearance: String
        }
    }
</script>

<style lang="scss" scoped>

    p {
        @include reset-pad-marg();
        @include list-padding(0, 0, 20, 20);
    }

    .paragraph-light {
        color: $block-description-light-color;
    }

    .paragraph-dark {
        color: $block-description-dark-color;
    }
</style>