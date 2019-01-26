<template lang="pug">
    include ../../../../pug-files/mixins/mixins.pug

    ul.secondary-navbar-menu
        li.secondary-navbar-menu__menu-item
            form.pick-language-form(method="GET")
                label.pick-language-form__label(for="select-language") Язык
                select#select-language(v-model="selectedLanguage")
                    option(disabled value="") "Пожалуйста, выберите язык"
                    option(v-for="option in availableLanguages" :value="option.data") {{ option.text }}
            // - Этот блок показывается на десктопной версии
            PickLanguageBlock
</template>

<script>
    import PickLanguageBlock from '../pick-language-block/index.vue';

    export default {
        // name: "secondary-navbar-menu",
        components: {
            PickLanguageBlock
        },
        data() {
            return {
                mainDomain: "https://mayor-mayor.com",
                linkData: {
                    text: "Политика конфиденциальности",
                    address: `privacy-policy`
                },
                // value - адрес страницы на конкретном языке
                availableLanguages: [
                    {
                        text: "Русский",
                        data: "ru"
                    },
                    {
                        text: "English",
                        data: "en"
                    },
                    {
                        text: "简体中文",
                        data: "zh"
                    }
                ],
                chosenLanguage: "ru"
            }
        },
        computed: {
        },
        methods: {
            setSelectedValue(value) {
                this.value = value;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .secondary-navbar-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        @include reset-pad-marg();
        list-style-type: none;

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: absolute;
            top: 66px;
            right: 0;
            width: 150px;
            border-radius: 10px;
            background-color: $secondary-menu-bg;
            overflow: hidden;
        }

        &__menu-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 23px 0;

            @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
                height: 55px;
                padding: 0;
                background-color: $secondary-menu-bg;

                &:hover {
                    background-color: darken($secondary-menu-bg, 10%);
                }

            }
        }

        .pick-language-form {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;

            @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
                display: none;
            }

            &__label {
                color: $menu-link-color;
            }
        }

        &__menu-link {
            color: #ffffff;
            text-decoration: none;

            @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
                color: #000000;
                font-size: 0.9em;
            }
        }
    }

    #select-language {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
        background-color: transparent;
        border: 0px;
        color: transparent;
        outline: transparent;
    }
</style>