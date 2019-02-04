<template lang="pug">
    ul.cell-list
        li.cell-list__item(v-for="item in data")
            span.list-item-text {{ item }}
</template>

<script>
    export default {
        props: ['data']
    }
</script>

<style  lang="scss" scoped>

    .cell-list {
        display: flex;
        flex-direction: row;

        &__list-item {
            display: flex;
            flex-direction: column;
            align-self: center;
            padding: 15px 10px;
            @include border-radius(5px);
            margin-right: 15px;
            background-color: pink;
        }
    }

    .list-item-text {
        display: inline-block;
        vertical-align: middle;
    }

</style>