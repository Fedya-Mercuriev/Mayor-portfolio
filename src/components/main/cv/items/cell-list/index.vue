<template lang="pug">
    div.cell-list-wrapper
        ul.cell-list(:style="{width: width + 'px'}")
            li.cell-list__item(
                v-for="item in data"
                :class="getClassNameByTitle(item)"
            )
                span.list-item-text {{ item }}
</template>

<script>
    export default {
        props: ['data'],
        data() {
            return {
                width: undefined
            }
        },
        nextTick() {
            window.addEventListener('resize', this.setWidth());
            console.log(`Ширина списка: ${this.width}px`);
        },
        beforeMount() {
            this.width = this.setWidth();
        },
        methods: {
            setWidth() {
                this.width = window.outerWidth;
            },
            getClassNameByTitle(title) {
                let rootTitle = title.split(title.match(/\s?[~`!#$%^&*+=\-\[\]\\';,./{}|\\":<>\?]/))[0],
                    stopIndex = rootTitle.search(/\d/);
                if (stopIndex === -1) {
                    return `cell-list__${rootTitle.substring(0).toLowerCase()}`;
                }
                return `cell-list__${rootTitle.substring(0, stopIndex).toLowerCase()}`;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .cell-list-wrapper {
        position: relative;
        top: 0;
        left: 0;
        height: 40px;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            position: unset;
            height: auto;
        }
    }

    .cell-list {
        position: absolute;
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
            background-color: $cell-list-item-bg;
            @include box-shadow(
                            0 3px 1px -2px rgba(0,0,0,.2),
                            0 2px 2px 0 rgba(0,0,0,.14),
                            0 1px 5px 0 rgba(0,0,0,.12)
            );

            @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
                margin-bottom: 10px;
                box-shadow: none;
            }
        }

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            position: static;
            top: unset;
            left: unset;
            flex-wrap: wrap;
            width: 100%;
            padding: 0 20px;
        }

        &__html {
            color: set-notification-text-color($html5-bg);
            background-color: $html5-bg;
        }

        &__css {
            color: set-notification-text-color($css3-bg);
            background-color: $css3-bg;
        }

        &__js {
            color: set-notification-text-color($javascript-bg);
            background-color: $javascript-bg;
        }

        &__vue {
            color: set-notification-text-color($vue-bg);
            background-color: $vue-bg;
        }

        &__less {
            color: set-notification-text-color($less-bg);
            background-color: $less-bg;
        }

        &__scss {
            color: set-notification-text-color($sass-bg);
            background-color: $sass-bg;
        }

        &__pug {
            color: set-notification-text-color($pug-bg);
            background-color: $pug-bg;
        }

        &__photoshop {
            @include graphSoftwareRules($photoshop-color, $photoshop-bg);
        }

        &__illustrator {
            @include graphSoftwareRules($illustrator-color, $illustrator-bg);
        }

        &__sketch {
            @include graphSoftwareRules($sketchapp-color, $sketchapp-bg);
        }

        &__figma {
            @include graphSoftwareRules($figma-color, $figma-bg, $figma-bg);
        }
    }

    .list-item-text {
        display: inline-block;
        vertical-align: middle;
        color: inherit;
    }

</style>