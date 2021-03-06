<template lang="pug">
    div
        a.trigger-pick-language-block(
            v-show="chooseLangBtnShown"
            @click="displayPickLanguageBlock"
        )
            span.trigger-pick-language-block__button-text {{ $t('menu.chooseLanguage.btnText') }}

        //- Позиционируется фиксированно
        div(v-show="secondaryMenuShown")
            div.pick-language-block
                a.close-block-btn(@click="secondaryMenuShown = false" role="button")
                    i.close-block-btn__stroke
                    i.close-block-btn__stroke
                div.block-icon
                    ChineseCharacter.chinese-character(
                        :class="{'chinese-character--is-active': hoveredLang === 'zh'}"
                    )
                    LatinLetter.latin-letter(
                        :class="{'latin-letter--is-active': hoveredLang === 'ru' || hoveredLang === 'en'}"
                    )

                //- Блок с кнопками
                h4.pick-language-block__block-title {{ $t(blockTitle) }}
                ul.languages-list(@mouseleave="hoveredLang = null")
                    li.languages-list__menu-item(
                        v-for="item in availableLanguages"
                        @mouseover="hoveredLang = item.data"
                    )
                        a(
                            :language="item.data"
                            @click.prevent="setLocale(item.data)"
                        ) {{ item.text }}
            div.block-overlay(@click="secondaryMenuShown = false")
</template>

<script>
    import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
    import ChineseCharacter from '../../../../svg/chinese-character.svg';
    import LatinLetter from '../../../../svg/latin-letter.svg';
    import { EventBus } from 'Root/event-bus';

    export default {
        components: {
            ChineseCharacter,
            LatinLetter
        },
        props: {
            chooseLangBtnShown: {
                type: 'Boolean',
                required: true
            }
        },
        mounted() {
            EventBus.$on('close-secondary-menu', () => {
               this.secondaryMenuShown = false;
            });
        },
        data() {
            return {
                blockTitle: 'menu.chooseLanguage.blockTitle',
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
                        text: "繁體中文",
                        data: "zh"
                    }
                ],
                secondaryMenuShown: false,
                hoveredLang: null
            }
        },
        watch: {
            secondaryMenuShown(val) {
                if (val) {
                    disableBodyScroll(this.$el);
                } else {
                    enableBodyScroll(this.$el);
                }
            }
        },
        methods: {
            pickLanguage(event) {
                this.$emit('click', event.target.language);
            },
            setLocale(locale) {
                this.$i18n.locale = locale;
                EventBus.$emit('change-language', locale);
            },
            hideModalWindow() {
                this.pickLanguageBlockShown = false;
                this.pickLanguageBlockShown = null;


            },
            displayPickLanguageBlock() {
                this.$emit('hide-secondary-menu', false);
                this.secondaryMenuShown = !this.secondaryMenuShown;

            }
        }
    }
</script>

<style lang="scss" scoped>

    .trigger-pick-language-block {
        display: none;

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: absolute;
            top: 60px;
            right: 0;
            box-sizing: border-box;
            display: block;
            width: 150px;
            padding: 15px 0;
            @include border-radius(7px);
            color: $primary-text-color;
            background-color: #ffffff;
            @include transition(background-color 0.3s, color 0.3s);

            &:hover {
                background-color: darken(#ffffff, 35%);
            }

            &:active {
                background-color: darken(#ffffff, 48%);
            }

            &__button-text {
                display: block;
                width: 100%;
                text-align: center;
            }
        }
    }

    .pick-language-block {
        display: none;

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: fixed;
            top: 30%;
            left: 50%;
            z-index: 10000;
            @include transform(translateX(-50%));
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: $pick-lang-block-min-width;
            padding: 15px;
            border-radius: 7px;
            background-color: #ffffff;
            cursor: default;
            @include box-shadow(0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12));

            &__block-title {
                @include reset-pad-marg();
                margin-top: 20px;
                font-size: 24px;
                text-align: center;
                color: $primary-text-color;
            }
        }
    }

    .block-icon {
        position: relative;
        top: 10px;
        width: 80px;
        height: 80px;
    }

    .chinese-character {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 35px;

        & path {
            @include transition(all 0.3s);
           fill: $inactive-icon-color;
        }

        &--is-active {
            & path {
                fill: $active-icon-color;
            }
        }
    }

    .latin-letter {
        position: absolute;
        bottom: 20px;
        right: 17px;
        width: 24px;

        & path {
            @include transition(all 0.3s);
            fill: $inactive-icon-color;
        }

        &--is-active {
            & path {
                fill: $active-icon-color;
            }
        }
    }

    .languages-list {
        width: 100%;
        @include reset-pad-marg();
        margin-top: 30px;
        list-style-type: none;

        &__menu-item {
            padding: 15px 0;
            border-radius: 5px;
            color: $dialog-font-color;
            cursor: pointer;

            a {
                display: block;
                text-align: center;
                text-decoration: none;
                color: inherit;
            }

            &:hover {
                background-color: #86858524;
                color: $primary-text-color;
            }
        }
    }

    .close-block-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        cursor: pointer;

        &__stroke {
            position: absolute;
            top: 18px;
            left: 2px;
            @include transform(rotateZ(45deg));
            transform-origin: center;
            display: block;
            width: 90%;
            height: 3px;
            background-color: #000000;

            &:nth-last-child(1) {
                position: absolute;
                bottom: 15px;
                @include transform(rotateZ(-45deg));
                transform-origin: center;
                display: block;
                width: 90%;
                height: 3px;
                background-color: #000000;
            }
        }
    }

    .block-overlay {
        display: none;

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            display: block;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.55);
            cursor: default;
        }
    }
</style>