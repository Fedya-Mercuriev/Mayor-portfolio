<template lang="pug">
    p(:class="{'paragraph-light': appearance === 'light', 'paragraph-dark': appearance === 'dark'}") {{ text }}
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
        //color: $paragraph-light-color;
    }

    .paragraph-dark {
        //color: $paragraph-dark-color;
    }
</style>