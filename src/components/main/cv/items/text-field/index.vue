<template lang="pug">
    p.text-field {{ data }}
</template>

<script>
    export default {
        props: {
            data: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

    .text-field {
        @include reset-pad-marg();
        @include list-padding(0, 0, 20, 20);
        color: $cv-item-text-color;
    }
</style>