<template lang="pug">
    section#contacts
        H2(:appearance="appearance") {{ $t(contactInfo.blockTitle) }}
        BlockDescription(:appearance="appearance")
            |{{ $t(contactInfo.blockDescription.line1) }}
            span.applicant-name
                span.applicant-name__text {{ $t(contactInfo.name) }}
                div.applicant-name__highlighter
            |{{ `${$t(contactInfo.blockDescription.line2)}:` }}

        // - Ссылки на социальные сети начинаются здесь
        div.social-networks
            p.social-networks__title {{ $t(contactInfo.socialNetworksBlockTitle) }}
            div.buttons-container
                div.social-button-wrapper(v-for="item in contactInfo.socialNetworks")
                 ContainedButton(
                    :text="item.text"
                    :href="item.link"
                    :goToNewPage="true"
                    :appearance="appearance"
                    :iconPosition="'left'"
                    :additionalClass="`${item.text}-link`"
                  )
                    template(v-if="item.text === 'telegram'")
                        TelegramIcon
                    template(v-else-if="item.text === 'pinterest'")
                        PinterestIcon
                    template(v-else)
                         GithubIcon
        // - Ссылки на социальные сети заканчиваются здесь

        div.email
            p.email__title {{ $t(contactInfo.email.blockTitle) }}
                span.email__email-text (gleb.gorkoltsev@yandex.ru)
            div.buttons-container
                div.mail-button-wrapper
                    ContainedButton(
                    :text="contactInfo.email.text"
                    :href="contactInfo.email.link"
                    :goToNewPage="true"
                    :appearance="appearance"
                    :iconPosition="'left'"
                    )
                        MailIcon
</template>

<script>
    import Vue from 'vue';
    import H2 from 'Components/public/text-components/titles/level-2.vue';
    import BlockDescription from 'Components/public/text-components/block-description.vue';
    import ContainedButton from 'Components/public/buttons/contained-button.vue';
    import TelegramIcon from 'Root/svg/telegram-icon.svg';
    import PinterestIcon from 'Root/svg/pinterest-icon.svg';
    import GithubIcon from 'Root/svg/github-icon.svg';
    import MailIcon from 'Root/svg/mail-logo.svg';

    export default {
        props: {
            appearance: String
        },
        mounted() {
            let containedButton = Vue.extend(ContainedButton),
                socialNetowrksInfo = {},
                mailInfo = {};

            socialNetowrksInfo.wrappers = document.querySelectorAll('.social-button-wrapper');
            socialNetowrksInfo.dataObj = this.contactInfo.socialNetworks;

            mailInfo.wrappers = document.querySelectorAll('.mail-button-wrapper');
            mailInfo.dataObj = this.contactInfo.email;
        },
        components: {
            H2,
            BlockDescription,
            ContainedButton,
            TelegramIcon,
            PinterestIcon,
            GithubIcon,
            MailIcon
        },
        data() {
            return {
                contactInfo: {
                    blockTitle: 'contactInfo.title',
                    blockDescription: {
                        line1: 'contactInfo.description.line1',
                        line2: 'contactInfo.description.line2'
                    },
                    name: 'contactInfo.description.name',
                    socialNetworksBlockTitle: 'socialNetworks.title',
                    socialNetworks: {
                        telegram: {
                            text: "telegram",
                            link: "https://teleg.run/mayor_mayor"
                        },
                        pinterest: {
                            text: "pinterest",
                            link: "https://www.pinterest.ru/mayor_mayor/"
                        },
                        github: {
                            text: "github",
                            link: "https://github.com/Fedya-Mercuriev"
                        }
                    },
                    email: {
                        blockTitle: 'email.title',
                        text: 'email.writeLetterBtnText',
                        link: "mailto:gleb.gorkoltsev@yandex.ru?subject=Держите тестовое!"
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    #contacts {
     margin-bottom: 30px;

     @media screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
      margin-bottom: 40px;
     }
    }

    .applicant-name {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        padding: 15px 40px;
        margin: 0 5px;

        &__text {
            position: absolute;
            top: 45%;
            left: 0;
            z-index: 1;
            @include transform(translateY(-50%));
            display: block;
            width: 100%;
            font-size: 1.5em;
            font-weight: 700;
            text-transform: uppercase;
        }

        &__highlighter {
            position: absolute;
            top: 50%;
            left: 0;
            z-index: 0;
            @include transform(translateY(-50%));
            width: 100%;
            height: 50%;
            background-color: $primary-bg-color;
            opacity: 0.6;
        }
    }

    .social-networks {

        &__title {
            margin: 30px 0 20px 0;
            text-align: center;
            font-size: 1.7em;
            font-weight: 700;
            color: $primary-text-color;
        }
    }

    .email {

        &__title {
            margin: 30px 0 20px 0;
            text-align: center;
            font-size: 1.7em;
            font-weight: 700;
            color: $primary-text-color;
        }

        &__email-text {
            font-size: 0.7em;
            display: block;
            color: $primary-color;
            opacity: 0.8;

            @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
                font-size: 1em;
            }
        }
    }

    .buttons-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
    }

    .social-button-wrapper {
        width: 85%;
        margin-bottom: 20px;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-s') + 1px) {
            width: 65%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'mobile-m') + 1px) {
            width: 55%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            width: 25%;
            margin-right: 15px;
            margin-bottom: 0;
        }

        @media only screen and (min-width: map-deep-get($devices, 'desktop')) {
            width: 18%;
            margin-right: 16px;
            margin-bottom: 0px;
        }
    }

    .mail-button-wrapper {
        width: 85%;
        margin-bottom: 20px;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-s') + 1px) {
            width: 75%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'mobile-m') + 1px) {
            width: 65%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            width: 35%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'desktop')) {
            width: 25%;
            margin-right: 16px;
            margin-bottom: 0px;
        }
    }

 </style>