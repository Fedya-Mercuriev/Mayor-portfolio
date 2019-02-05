<template lang="pug">
    ul.ordinary-list
        li.ordinary-list__item(v-for="item in data") {{ item.text }}
</template>

<script>
    export default {
        props: ['data']
    }
</script>

<style lang="scss" scoped>

    .ordinary-list {
        @include reset-pad-marg();
        @include list-padding(0, 0, 20, 20);
        list-style-type: none;
        
        &__item {
            padding: 10px 10px;
            @include border-radius(5px);
            margin-bottom: 10px;
            text-align: center;
            color: #000000;
            background-color: $cv-list-item-bg;
            @include transition(color 0.3s);

            &:hover {
                color: lighten($cv-list-item-color, 50%);
            }
        }
    }
</style>