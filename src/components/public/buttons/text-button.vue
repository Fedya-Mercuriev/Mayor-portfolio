<template lang="pug">
    a.text-btn(
        role="button"
        :class="[{'text-btn-light': appearance === 'light'}, {'text-btn-dark': appearance === 'dark'}]"
        :href="href"
        :target="{'_blank': goToNewPage}"
    )
        div.link-icon-wrapper(:class="positionIcon()")
            slot
        span.text-btn__btn-text {{ text }}

</template>

<script>
    import Vue from 'vue';
    import TelegramIcon from './../../svg/telegram-icon.svg';
    import PinterestIcon from './../../svg/pinterest-icon.svg';
    import GithubIcon from './../../svg/github-logo.svg';
    import MailIcon from './../../svg/mail-logo.svg';

    export default {
        props: {
            text: {
                type: "String",
                required: true
            },
            href: {
                type: "String",
                required: true
            },
            // Если true, то ставит target как "_blank"
            goToNewPage: {
                type: "Boolean",
                required: false
            },
            appearance: {
                // Допустимые знаечения: "dark", "light"
                type: "String",
                required: true
            },
            iconPosition: {
                // Допустиые значения: "left", "right"
                type: "String",
                required: false
            }
        },
        data() {
            return {
                classList: []
            }
        },
        computed: {
            positionIcon() {
                if (!this.iconPosition) {
                    return '';
                } else {
                    return (this.iconPosition === 'left') ? 'icon-left' : 'icon-right';
                }
            }
        }
    }
</script>

<style lang="scss">

    .text-btn {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        padding: 10px 15px;
    }

    .link-icon-wrapper {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 13px;
    }

    // Класс применяетсяк обертке для иконки
    .icon-left {
        order: 1;
    }

    .icon-right {
        order: 2;
    }

    .text-btn-light {
        color: $text-button-light-color-mobile;
        @include transition(all 0.3s);

        @media only screen and (min-width: map-deep-get($devices, 'desktop')) {
            color: $text-button-light-color-desktop;

            &:hover {
                color: $text-button-light-color-hover;
            }

            &:active {
                color: $text-button-clicked-color;
            }
        }

        &--clicked {
            color: $text-button-clicked-color
        }
    }

    .text-btn-dark {

    }
</style>