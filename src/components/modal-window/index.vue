<template lang="pug">
    div(v-show="visible")
        div.modal-window
            a.modal-window__close-block-btn(@click.stop="visible = false" role="button") Закрыть окно
            h4.pick-language-block__block-title Пожалуйста, выберите язык
            ul.languages-list
                li.languages-list__menu-item(v-for="item in availableLanguages" @click="pickLanguage")
                    a(:href='"https://" + item.data +".mayor-mayor.com"') {{ item.text }}
        div.block-overlay(v-on:click="hideModalWindow")
</template>

<script>
    export default {
        props: {
            stateVisible: {
                type: Boolean,
                required: true
            }
        },
        date() {
            return {
                isVisible: this.stateVisible
            }
        },
        computed: {
            visible: {
                get() {
                    return this.isVisible
                },
                set(value) {
                    this.visible = value;
                }
            }
        },
        methods: {
            hideModalWindow() {
                this.stateVisible = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .modal-window {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 10000;
        -webkit-transform: translate(-50%);
        -moz-transform: translate(-50%);
        -ms-transform: translate(-50%);
        -o-transform: translate(-50%);
        transform: translate(-50%);
        border-radius: 5px;
        background-color: #ffffff;
    }

    .languages-list {
        @include reset-pad-marg();
        list-style-type: none;
    }

    .block-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        cursor: default;
    }

</style>