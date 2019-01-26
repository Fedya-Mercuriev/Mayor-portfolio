<template src="./template.pug" lang="pug">

</template>

<script>
    export default {
        props: ['displayChooseLangButton'],
        data() {
            return {
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
                pickLanguageBlockShown: false
            }
        },
        methods: {
            pickLanguage(event) {
                this.$emit('click', event.target.language);
            },
            hideThisBlock() {
                this.$emit('hidePickLanguageBlock');
            },
            displayPickLanguageBlock() {
                this.pickLanguageBlockShown = !this.pickLanguageBlockShown;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .pick-language-block-wrapper {
        display: none;

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            /*position: absolute;*/
            /*top: 15px;*/
            /*right: 0;*/
            /*box-sizing: border-box;*/
            /*display: block;*/
            /*width: 100px;*/
            /*height: 100%;*/
            /*padding: 20px 0;*/
            /*background-color: #ffffff;*/
        }
    }

    .trigger-pick-language-block {
        /*display: flex;*/
        /*flex-direction: row;*/
        /*align-items: center;*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*text-align: center;*/
        position: absolute;
        top: 60px;
        right: 0;
        box-sizing: border-box;
        display: block;
        width: 150px;
        padding: 15px 0;
        @include border-radius(7px);
        background-color: #ffffff;
        @include transition(background-color 0.3s);

        &:hover {
            background-color: darken(#ffffff, 35%);
        }

        &__button-text {
            display: block;
            width: 100%;
            text-align: center;
        }
    }

    .pick-language-block {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 10000;
        -webkit-transform: translate(-50%);
        -moz-transform: translate(-50%);
        -ms-transform: translate(-50%);
        -o-transform: translate(-50%);
        transform: translate(-50%);
        border-radius: 7px;
        background-color: #ffffff;
    }

    .languages-list {
        @include reset-pad-marg();
        list-style-type: none;
    }
</style>