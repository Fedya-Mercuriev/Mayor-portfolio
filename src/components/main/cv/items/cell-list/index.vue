<template lang="pug">
    div.cell-list-wrapper
        ul.cell-list(:style="{width: getWidth() + 'px'}")
            li.cell-list__item(v-for="item in data")
                span.list-item-text {{ item }}
</template>

<script>
    export default {
        props: ['data'],
        methods: {
            getWidth() {
                return window.clientWidth;
            }
        }
    }
</script>

<style  lang="scss" scoped>

    .cell-list-wrapper {
        position: relative;
        top: 0;
        left: 0;
        height: 40px;
    }

    .cell-list {
        position: absolute;
        /*z-index: 1;*/
        top: 0;
        left: -15px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        box-sizing: border-box;
        width: 100vw;
        @include reset-pad-marg();
        padding-left: 10px;
        padding-bottom: 5px;
        list-style-type: none;
        overflow-x: scroll;

        &__item {
            display: flex;
            flex-direction: row;
            align-self: center;
            padding: 8px 15px;
            @include border-radius(5px);
            margin-right: 15px;
            white-space: nowrap;
            /*margin-bottom: 10px;*/
            background-color: $cell-list-item-bg;
        }

        &::after {
            content: '';
            display: block;
            width: 20px;
            height: 20px;
        }
    }

    .list-item-text {
        display: inline-block;
        vertical-align: middle;
    }

</style>