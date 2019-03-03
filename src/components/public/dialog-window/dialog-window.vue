<template lang="pug">
    div
        div(
        :class="{'dialog-window': true, 'dialog-window-light': appearance === 'light', 'dialog-window-dark': appearance === 'dark'}"
        )
            div.dialog-window__content-block
                H3(:appearance="appearance") {{ blockTitle }}
                Paragraph(:appearance="appearance") {{ blockText }}
                div.action-btn-wrapper(@click="setSuggestedLang")
                    ContainedButton(
                        :text="setLangBtnText"
                        :appearance="appearance"
                        :additionalClass="'dialog-window__set-lang-action-btn'"
                    )
                div.action-btn-wrapper(@click="closeWindow")
                    TextButton(
                        :text="leaveLangBtnText"
                        :appearance="appearance"
                    )
        div.bg-overlay
</template>

<script>
    import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
    import H3 from 'Components/public/text-components/titles/level-3.vue';
    import Paragraph from 'Components/public/text-components/paragraph.vue';
    import ContainedButton from 'Components/public/buttons/contained-button.vue';
    import TextButton from 'Components/public/buttons/text-button.vue';
    import { EventBus } from 'Root/event-bus';

    export default {
        name: "change-lang-window",
        components: {
            H3,
            Paragraph,
            ContainedButton,
            TextButton
        },
        props: {
            appearance: String,
            windowIsShown: Boolean
        },
        mounted() {
            // Подберем язык в соответствием с настройками у пользователя
            let userLanguage = window.navigator.languages[0].split('-')[0],
                messageLang;
            if (userLanguage !== this.$i18n.locale) {
                let siteLanguages = Object.keys(this.$i18n.messages);
                // Если у пользователя в настройках есть один из доступных на сайте языков, тогда выбираем
                // его для отображения сообщения; иначе берем fallback-язык
                messageLang = siteLanguages.indexOf(userLanguage) ? 'ru' : this.$i18n.fallbackLocale;
                this.suggestedLanguage = messageLang;
            }
            // Отобразим текст диалогового окна на языке, который определили
            this.blockTitle = this.$i18n.messages[messageLang].chooseLangWindow.title;
            this.blockText = this.$i18n.messages[messageLang].chooseLangWindow.text;
            this.setLangBtnText = this.$i18n.messages[messageLang].chooseLangWindow.setLangBtnText;
            this.leaveLangBtnText = this.$i18n.messages[messageLang].chooseLangWindow.leaveLangBtnText;
        },
        data() {
            return {
                blockTitle: 'chooseLangWindow.title',
                blockText: 'chooseLangWindow.text',
                setLangBtnText: 'chooseLangWindow.setLangBtnText',
                leaveLangBtnText: 'chooseLangWindow.leaveLangBtnText',
                suggestedLanguage: null
            }
        },
        methods: {
            setSuggestedLang() {
                EventBus.$emit('change-language', this.suggestedLanguage);
                this.$i18n.locale = this.suggestedLanguage;
                this.closeWindow();
            },
            closeWindow() {
                let modalWindowScrollableBlock = document.querySelector('.dialog-window__content-block');
                this.$emit('close-window');
                sessionStorage.setItem('showChooseLangWindow', 'true');
                enableBodyScroll(modalWindowScrollableBlock);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .dialog-window {
        position: fixed;
        top: 0;
        left: 50%;
        @include transform(translateX(-50%));
        z-index: 1000;
        width: 93%;
        @include border-radius($large-component-border-radius);

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            width: 60%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            width: 40%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            top: 80px;
            width: 30%;
        }

        &__content-block {
            max-height: 450px;
            padding: 15px 15px;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }

        &__set-lang-action-btn {
            margin-bottom: 20px;
            color: $dialog-window-btn-color;
            background-color: $dialog-window-btn-bg;

            &:hover {
                background-color: lighten($dialog-window-btn-bg, 10%);
            }
        }
    }

    p {
        margin-bottom: 20px;
        font-size: 0.9em;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-s') + 1px) {
            font-size: 1em;
        }
    }

    .action-btn-wrapper {
        width: 90%;
        margin: 0 auto;
        font-size: 0.78em;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-s') + 1px) {
            font-size: 1em;
        }
    }

    .dialog-window-light {
        background-color: $dialog-window-light-bg;
    }

    .dialog-window-dark {
        background-color: $dialog-window-dark-bg;
    }

    .bg-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

</style>