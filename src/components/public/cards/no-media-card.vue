<template lang="pug">
    div.card-wrapper
        div.card
            div.card-body(
                :class="{'card-body-dark': appearance === 'dark', 'card-body-light': appearance === 'light'}"
            )
            div.card-content(
                ref="card-content"
                :class="{'card-content-dark': appearance === 'dark', 'card-content-light': appearance === 'light'}"
            )
                h3.card-content__card-title {{ cardData.title }}
                p.card-content__description(v-if="cardData.description") {{ cardData.description }}
                slot

</template>

<script>
    import Vue from 'vue';
    import TextComponent from 'Components/public/text-components/paragraph.vue';
    import CellList from 'Components/public/lists/cell-list.vue';
    import ListWithButtons from 'Components/public/lists/list-with-buttons.vue';
    import List from 'Components/public/lists/ordinary-list.vue';

    function getItemType(item) {
        if (!Array.isArray(item)) {
            return 'text';
        } else if (item && !Array.isArray(item) && typeof item === 'object') {
            return 'object';
        } else {
            return 'array';
        }
    }

    export default {
        name: "no-media-card",
        props: {
            appearance: String,
            cardData: Object
        },
        mounted() {
            let component,
                prop = this.cardData.data;

            if (getItemType(prop) === 'text') {
                let ComponentConstructor = Vue.extend(TextComponent);
                component = new ComponentConstructor({
                    propsData: {
                        data: prop
                    }
                });
            } else if (getItemType(prop) === 'array') {
                let ComponentConstructor;
                ComponentConstructor = (typeof prop[0] === 'object') ? ((prop[0].hasOwnProperty('hasCertificate')) ? ListWithButtons : List) : CellList;
                ComponentConstructor = Vue.extend(ComponentConstructor);
                component = new ComponentConstructor({
                    propsData: {
                        data: prop
                    }
                });
            }
            component.$mount();
            this.$refs['card-content'].appendChild(component.$el);

        }
    }
</script>

<style lang="scss" scoped>

    $card-content-class-name: card-content;

    .card-wrapper {
        margin-top: 10px;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding: 0 7px 15px 7px;
        }

    }

    .card {
        position: relative;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding-bottom: 10px;
        }
    }

    .card-body {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-bottom: 20px;
        @include border-radius(10px);
        @include box-shadow(
                        0 11px 15px -7px rgba(0,0,0,0.2),
                        0 24px 38px 3px rgba(0,0,0,0.14),
                        0 9px 46px 8px rgba(0,0,0,0.12)
        );

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding-bottom: 0;
        }
    }

    .card-body-light {
        background-color: $card-bg-light;
    }

    .card-body-dark {
        background-color: $card-bg-dark;
    }

    .card-content {
        position: relative;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        padding-top: 10px;

        &__card-title {
            @include reset-pad-marg();
            padding: 0px 10px;
            /*margin-top: 10px;*/
            margin-bottom: 15px;
            text-align: center;
            font-size: 1.8em;
            color: $primary-text-color;

            @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
                padding: 10px 10px;
                margin: 0;
            }
        }

        &__description {
            @include reset-pad-marg();
            padding: 0 10px;
            margin-bottom: 20px;
            font-size: 1.1em;
            text-align: center;
            color: $primary-text-color;
        }
    }

    .card-content-light {

        .#{$card-content-class-name}__card-title {
            color: $card-title-color-light;
        }

        .#{$card-content-class-name}__description {
            color: $card-description-color-light;
        }
    }

    .card-content-dark {

        .#{$card-content-class-name}__card-title {
            color: $card-title-color-dark;
        }

        .#{$card-content-class-name}__description {
            color: $card-description-color-dark;
        }
    }

    .cv-item-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>