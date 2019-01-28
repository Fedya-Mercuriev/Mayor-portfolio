<template lang="pug">
    //include ../../../../pug-files/mixins/mixins.pug
    nav.page-navigation(v-show="isShown")
        ul.navigation-menu(@highlight-item="updateActiveMenuItems", @click="")
            li(
                v-for="(item, index) in menuItems"
                :class="{'navigation-menu__menu-item': true, 'navigation-menu__menu-item--is-current': item.isCurrent}"
                :key="index"
                v-on:click="updateActiveMenuItems"
            )
                a.navigation-menu__menu-link(:href="item.hash")
                    span {{ item.text }}

            //- Пункт меню для выбора языка (для мобильных устройств)
            li(class="navigation-menu__menu-item mobile-choose-lang")
                form
                    label(for="select-language") Язык {{ value }}
                        select#select-language(v-model="value")
                            option(disabled value="") "Пожалуйста, выберите язык"
                            option(v-for="option in availableLanguages" :value="option.data") {{ option.text }}
            //- Конец пункта меню для выбора языка (для мобильных устройств)
            li.secondary-menu-wrapper
                a.trigger-additional-menu-btn(
                    :class="{'trigger-additional-menu-btn--is-clicked': secondaryMenuOpened}"
                    @click.stop="displaySecondaryMenu"
                )
                    i.icon-dot
                    i.icon-dot
                    i.icon-dot
                PickLanguageBlock(:displayChooseLangButton="secondaryMenuOpened")
                //- SecondaryNavbarMenu(v-show="secondaryMenuOpened")
                //- ul.secondary-navbar-menu(v-show="secondaryMenuOpened")
                    //- li.secondary-navbar-menu__menu-item
                            // - Этот блок показывается на десктопной верси

</template>

<script>
    import PickLanguageBlock from '../pick-language-block/index.vue';

    export default {
        name: 'page-navigation',
        components: {
            PickLanguageBlock
        },
        props: ['isShown'],
        data() {
            return {
                menuBaseClass: 'navigation-menu',

                menuItems: [
                    {
                        text: "Рассуждение",
                        hash: "#make-cn-sites-better",
                        isCurrent: true
                    }, {
                        text: "Портфолио",
                        hash: "#portfolio",
                        isCurrent: false
                    }, {
                        text: "Резюме",
                        hash: "#cv",
                        isCurrent: false
                    }, {
                        text: "Контакты",
                        hash: "#contacts",
                        isCurrent: false
                    }
                ],
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
                menuItemClass: `${this.menuBaseClass}__menu-item`,
                secondaryMenuOpened: false
            }
        },
        methods: {
            updateActiveMenuItems(event) {
                this.menuItems.forEach((item) => {
                    if (item.text === event.target.textContent) {
                        item.isCurrent = true;
                    } else {
                        if (item.isCurrent) {
                            item.isCurrent = false;
                        }
                    }
                })
            },
            displaySecondaryMenu() {
                this.secondaryMenuOpened = !this.secondaryMenuOpened
            }
        }
    }
</script>

<style lang="scss" scoped>

    .page-navigation {
        position: fixed;
        top: 7px;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        padding-top: 60px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #ffffff;

        /*@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {*/
            /*backdrop-filter: blur(5px);*/
            /*-webkit-backdrop-filter: blur(5px);*/
            /*background-color: rgba(255, 255, 255, 0.4);*/
        /*}*/

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: relative;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            width: auto;
            border-radius: 0;
            padding: 0;
            background-color: #000000;
        }
    }

    .navigation-menu {
        /*display: none;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style-type: none;
        @include reset-pad-marg();

        @media only screen and (max-width: map-deep-get($devices, 'tablet')) {
            display: flex;
            flex-direction: column;
            align-items: center;
            list-style-type: none;
            @include reset-pad-marg();
        }

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: relative;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: stretch;
        }

        &__menu-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 23px 0;
            color: $menu-link-color;

            @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
                display: flex;
                flex-direction: row;
                justify-content: stretch;
                height: 100%;
                padding: 0 20px;
                color: #bbbbbb;
                @include transition(text-shadow 0.4s);
            }

            &--is-current {
                color: #000000;

                @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
                    color: #ffffff;
                }
            }
        }

        &__menu-link {
            display: flex;
            flex-direction: row;
            align-items: center;
            text-decoration: none;
            color: inherit;
            text-shadow: inherit;
            @include transition(color 0.4s);

            @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
                &:hover {
                    color: lighten($menu-link-color, 50%);
                }
            }
        }
    }

    .mobile-choose-lang {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 23px 0;
        color: $menu-link-color;

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            display: none;
        }

        label {
            position: relative;
        }
    }
    
    .secondary-menu-wrapper {
        width: 100%;

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: relative;


            &:hover {
                cursor: pointer;
            }
        }
    }

    .trigger-additional-menu-btn {
        display: none;

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            width: 40px;
            height: 40px;
            padding: 8px 0;
            border-radius: 5px;
            @include transition(background-color 0.4s);

            &--is-clicked {
                background-color: #ffffff;

                .icon-dot {
                    background-color: #000000;
                }
            }

            &:hover {
                background-color: #5a5a5a;
                cursor: pointer;
            }
        }
    }

    .icon-dot {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #ffffff;
        @include transition(background-color 0.3s);
    }

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