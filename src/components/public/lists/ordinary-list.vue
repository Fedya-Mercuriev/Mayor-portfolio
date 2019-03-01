<template lang="pug">
    ul.ordinary-list(:class="appearanceClassList")
        li.ordinary-list__item(v-for="item in data") {{ $t(item.text) }}
</template>

<script>
    export default {
        props: {
            data: Object,
            appearance: String
        },
        computed: {
            appearanceClassList() {
                if (this.appearance === 'light') {
                    return 'ordinary-list-light';
                } else {
                    return 'ordinary-list-dark';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    $list-class-name: ordinary-list;

    .ordinary-list {
        @include reset-pad-marg();
        @include list-padding(0, 0, 20, 20);
        list-style-type: none;
        
        &__item {
            padding: 10px 10px;
            @include border-radius($medium-component-border-radius);
            margin-bottom: 10px;
            text-align: center;
            color: $primary-text-color;
            background-color: $cv-list-item-bg;
            @include transition(color 0.3s);
        }
    }

    .ordinary-list-light {

        .#{$list-class-name}__item {
            background-color: $list-item-light-bg;
            color: $list-item-light-color;
        }
    }

    .ordinary-list-dark {

        .#{$list-class-name}__item {
            background-color: $list-item-dark-bg;
            color: $list-item-dark-color;
        }
    }
</style>