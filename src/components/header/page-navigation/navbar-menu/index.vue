<template lang="pug">
    nav.page-navigation(ref="page-navigation")
        ul.navigation-menu(@highlight-item="updateActiveMenuItems")
            //- Обычные элементы меню
            li(
                v-for="(item, propName) in menuItems"
                :class="{'navigation-menu__menu-item': true,'navigation-menu__menu-item--is-current': item.isCurrent}"
                :key="propName"
            )
                a.navigation-menu__menu-link(:href="item.hash")
                    span {{ item.text }}
            //- Конец обычных элементов меню

            //- Пункт меню для выбора языка (для мобильных устройств)
            li(class="navigation-menu__menu-item mobile-choose-lang")
                form
                    label(for="select-language") Язык {{ value }}
                        select#select-language( v-on:input="showChosenValue")
                            option(disabled value="") "Пожалуйста, выберите язык"
                            option(v-for="option in availableLanguages" :value="option.data") {{ option.text }}
            //- Конец пункта меню для выбора языка (для мобильных устройств)

            li.secondary-menu-wrapper
                a.trigger-additional-menu-btn(
                    :class="{'trigger-additional-menu-btn--is-clicked': secondaryMenuOpened}"
                    @click.stop="displaySecondaryMenu"
                    v-click-outside="closeSecondaryMenu"
                )
                    i.icon-dot
                    i.icon-dot
                    i.icon-dot
                PickLanguageBlock(
                    :chooseLangBtnShown="secondaryMenuOpened"
                    v-on:hide-secondary-menu="displaySecondaryMenu"
                )

</template>

<script>
    import PickLanguageBlock from '../pick-language-block/index.vue';
    import { EventBus } from './../../../../event-bus.js';

    export default {
        name: 'page-navigation',
        components: {
            PickLanguageBlock
        },
        mounted() {
            EventBus.$on('highlight-li', (event) => {
                this.updateActiveMenuItems(event);
            });
            EventBus.$on('close-secondary-menu', () => {
                this.secondaryMenuOpened = false;
            });
        },
        data() {
            return {
                menuBaseClass: 'navigation-menu',
                menuItems: {
                    design: {
                        text: "Дизайн",
                        hash: "#design",
                        isCurrent: false
                    },
                    portfolio: {
                        text: "Портфолио",
                        hash: "#portfolio",
                        isCurrent: false
                    },
                    cv: {
                        text: "Резюме",
                        hash: "#cv",
                        isCurrent: false
                    },
                    contacts: {
                        text: "Контакты",
                        hash: "#contacts",
                        isCurrent: false
                    }
                },
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
        directives: {
            'click-outside': {
                bind: function(el, binding, vNode) {
                    // Provided expression must evaluate to a function.
                    if (typeof binding.value !== 'function') {
                        const compName = vNode.context.name;
                        let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
                        if (compName) { warn += `Found in component '${compName}'` }

                        console.warn(warn)
                    }
                    // Define Handler and cache it on the element
                    const bubble = binding.modifiers.bubble;
                    const handler = (e) => {
                        if (bubble || (!el.contains(e.target) && el !== e.target)) {
                            binding.value(e)
                        }
                    };
                    el.__vueClickOutside__ = handler;

                    // add Event Listeners
                    document.addEventListener('click', handler)
                },

                unbind: function(el, binding) {
                    // Remove Event Listeners
                    document.removeEventListener('click', el.__vueClickOutside__);
                    el.__vueClickOutside__ = null
                }
            }
        },
        methods: {
            updateActiveMenuItems(propName) {
                for (let prop in this.menuItems) {
                    if (prop === propName) {
                        this.menuItems[prop].isCurrent = true;
                    } else {
                        this.menuItems[prop].isCurrent = false;
                    }
                }
            },
            displaySecondaryMenu(state = null) {
                this.secondaryMenuOpened = (typeof state === 'boolean') ? state : !this.secondaryMenuOpened;
                // this.secondaryMenuOpened = !this.secondaryMenuOpened
            },
            closeSecondaryMenu() {
                this.secondaryMenuOpened = false;
            },
            showChosenValue(event) {
                console.log(event.target.value);
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
        background-color: $navbar-bg;

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            position: static;
            /*top: 0;*/
            /*left: 0;*/
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            width: auto;
            border-radius: 0;
            padding: 0;
            /*background-color: #000000;*/
        }
    }

    .navigation-menu {
        /*display: none;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style-type: none;
        @include reset-pad-marg();

        @media only screen and (max-width: map-deep-get($devices, 'desktop')) {
            display: flex;
            flex-direction: column;
            align-items: center;
            list-style-type: none;
            @include reset-pad-marg();
        }

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
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
            margin: 0 auto;
            color: $menu-link-color;

            @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) and (max-width: map-deep-get($devices, 'tablet')) {
                padding: 25px 0;
            }

            @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
                display: flex;
                flex-direction: row;
                justify-content: stretch;
                height: 100%;
                padding: 0 20px;
                color: #bbbbbb;
                /*@include transition(text-shadow 0.4s);*/
                
                &:hover {
                    color: #ffffff;
                }
            }

            &--is-current {
                color: $active-menu-link-color;
            }
        }

        &__menu-link {
            display: flex;
            flex-direction: row;
            align-items: center;
            text-decoration: none;
            color: inherit;
            text-shadow: inherit;
            @include transition(color 0.27s);

            @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) and (max-width: map-deep-get($devices, 'tablet')) {
                font-size: $menu-item-font-size-mobile;

                &:hover {
                    color: lighten($menu-link-color, 50%);
                }
            }

            @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) and (max-width: map-deep-get($devices, 'desktop')) {
                font-size: $menu-item-font-size-tablet;
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

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            display: none;
        }

        label {
            position: relative;
            font-size: $menu-item-font-size-mobile;

            @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
                font-size: $menu-item-font-size-tablet;
            }
        }
    }
    
    .secondary-menu-wrapper {
        display: none;

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            position: relative;
            display: block;
            width: 100%;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .trigger-additional-menu-btn {
        display: none;

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            width: 40px;
            height: 40px;
            padding: 8px 0;
            @include border-radius(50%);
            @include transition(background-color 0.4s);

            &--is-clicked {
                background-color: #f9aa33;

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

            @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
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