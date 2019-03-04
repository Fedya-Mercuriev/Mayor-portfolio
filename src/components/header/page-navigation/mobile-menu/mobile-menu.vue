<template lang="pug">
    div.mobile-menu-wrapper(:class="{'mobile-menu-wrapper--visible': menuVisible}")
        transition(name="menu-slide")
            ul.mobile-menu(@highlight-item="updateActiveMenuItems" v-show="menuVisible")
                //- Обычные элементы меню
                li(
                    v-for="(item, propName) in menuItems"
                    :class="{'mobile-menu__menu-item': true,'mobile-menu__menu-item--is-current': item.isCurrent}"
                    :key="propName"
                )
                    a.mobile-menu__menu-link(:href="item.hash")
                        span {{ $t(item.text) }}
                //- Конец обычных элементов меню

                //- Начало пункта меню для выбора языка
                li(class="navigation-menu__menu-item mobile-choose-lang")
                    form.choose-lang-form
                        label(for="select-language") {{ $t(pickLanguageFormData.labelText) }}
                            select#select-language(
                                v-model="chosenLanguage"
                                @input="chooseLanguage"
                            )
                                option(disabled value="") {{ `-- ${$t(pickLanguageFormData.selectFormDummyText)} --` }}
                                option(
                                    v-for="option in availableLanguages"
                                    :value="option.data"
                                ) {{ option.text }}
                    div.change-lang-btn-wrapper(v-on:click.prevent="setLocale()")
                        ContainedButton(
                            v-show="langIsChosen"
                            :appearance="appearance"
                            :href="'#'"
                            :text="$t(pickLanguageFormData.changeLangBtnText) + `(${chosenLanguage})`"
                            :additionalClass="'change-lang-btn'"
                        )
                //- Конец пункта меню для выбора языка
</template>

<script>
    import ContainedButton from 'Components/public/buttons/contained-button.vue';
    import { EventBus } from 'Root/event-bus';

    export default {
        name: "mobile-menu",
        components: {
            ContainedButton
        },
        props: {
            appearance: String,
            menuItems: Object,
            // Этот проп нужен для динамического применения классов для меню
            menuVisible: Boolean,
            availableLanguages: Object
        },
        data() {
            return {
                langIsChosen: false,
                chosenLanguage: null,
                pickLanguageFormData: {
                    labelText: 'menu.chooseLanguage.btnText',
                    selectFormDummyText: 'menu.chooseLanguage.inputDummyText',
                    changeLangBtnText: 'menu.chooseLanguage.changeLangBtnText'
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

            chooseLanguage(event) {
                let value = event.target.value;

                if (value !== this.$i18n.locale) {
                    this.langIsChosen = true;
                } else {
                    this.langIsChosen = false;
                }
            },

            setLocale() {
                this.$i18n.locale = this.chosenLanguage;

                EventBus.$emit('change-language', this.chosenLanguage);

                // Спрячем кнопку после клика
                this.langIsChosen = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .mobile-menu-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 150;

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            display: none;
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.2);
            opacity: 0;
            will-change: opacity;
            pointer-events: none;
            @include transition(opacity 0.3s cubic-bezier(0,0,0.3,1));
        }

        &--visible {
            pointer-events: auto;

            &::after {
                opacity: 1;
                pointer-events: auto;
            }
        }
    }

    .mobile-menu {
        position: relative;
        top: 0;
        left: 0;
        z-index: 160;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        @include reset-pad-marg();
        padding-top: 60px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        @include transform(translateY(10px));
        background-color: $navbar-bg;
        /* The main point: */
        /*overflow-y: auto;*/
        /*-webkit-overflow-scrolling: touch;*/
        list-style-type: none;

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
            font-size: $menu-item-font-size-mobile;
            color: inherit;
            text-shadow: inherit;
            @include transition(color 0.27s);

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

    .change-lang-btn-wrapper {
        min-width: 190px;
        margin-top: 30px;
    }

    .change-lang-btn {
        color: $primary-text-color;
        background-color: $primary-bg-color;

        &:active {
            background-color: darken($primary-bg-color, 15%);
        }
    }

    // Стили для Vue transitions
    .menu-slide-enter-active, .menu-slide-leave-active {
        //@include transform(translateY(10px));
        @include transition(all 0.3s cubic-bezier(.42,.46,.44,1.27));
    }

    .menu-slide-enter, .menu-slide-leave-to {
        @include transform(translateY(103%));
    }

    .menu-slide-enter-to {
        //@include transform(translateY(10px));
    }

</style>