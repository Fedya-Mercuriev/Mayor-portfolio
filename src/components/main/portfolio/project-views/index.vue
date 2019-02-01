<template lang="pug">
    div
        div.project-view
            div.project-block(v-if="projectInfo")
                a.close-block-btn(role="button" @click="hideWindow")
                    i.close-block-btn__stroke
                    i.close-block-btn__stroke
                div.project-info
                    header.project-info-header
                        h4.project-info__title {{ projectInfo.title }}
                    p.project-info__description {{ projectInfo.description }}
                    template(v-if="projectInfo.stack")
                        div.tech-stack-block
                            h5.tech-stack-block__title Стэк технологий:
                            ul.tech-stack-list
                                li.tech-stack-list__item(v-for="item in projectInfo.stack") {{ item }}
                i.block-separator
                div.project-links
                    h5.project-links__title Ссылки на проекты:
                    template(v-if="projectInfo.links.checkout")
                        volume-link(:link="projectInfo.links.checkout") Посмотреть
                    volume-link(:link="projectInfo.links.github") Github
        div.block-overlay(
            @click="hideWindow"
        )
</template>

<script>
    export default {
        props: [
            'projectInfo'
        ],
        data() {
            return {
                isVisible: false
            }
        },
        methods: {
            hideWindow() {
                this.$emit('hide-window', this)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .project-view {
        position: fixed;
        top: 100px;
        left: 50%;
        z-index: 10000;
        width: 90%;
        @include border-radius(7px);
        @include transform(translate(-50%));
        background-color: #ffffff;
        @include box-shadow(
                        0 11px 15px -7px rgba(0,0,0,.2),
                        0 24px 38px 3px rgba(0,0,0,.14),
                        0 9px 46px 8px rgba(0,0,0,.12)
        );
        overflow: hidden;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            top: 150px;
            width: 80%;
        }

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            width: 65%;
        }
    }

    .project-block {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 450px;
        overflow-y: scroll;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            flex-direction: row;
            align-items: unset;
            overflow-y: unset;
        }

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            //align-items: self-start;
            //height: 500px;
        }
    }

    .close-block-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10;
        width: 35px;
        height: 35px;
        @include border-radius(50%);
        background-color: $close-project-btn-bg;

        @media screen and( min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            cursor: pointer;
            @include transition(background-color 0.3s);

            &:hover {
                background-color: darken($close-project-btn-bg, 20%);
            }
        }

        &__stroke {
            position: absolute;
            top: 16px;
            left: 4px;
            @include transform(rotateZ(45deg));
            transform-origin: center;
            display: block;
            width: 75%;
            height: 3px;
            background-color: #000000;

            &:nth-last-child(1) {
                position: absolute;
                bottom: 15px;
                @include transform(rotateZ(-45deg));
                transform-origin: center;
                display: block;
                width: 75%;
                height: 3px;
                background-color: #000000;
            }
        }
    }

    .project-info {
        padding-top: 50px;

        @media screen and( min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            flex-basis: 50%;
            flex-grow: 1;
            overflow-y: scroll;
        }


        &__title {
            @include reset-pad-marg();
            padding-left: 10px;
            padding-right: 10px;
            font-size: 1.5em;
            text-align: center;
        }

        &__description {
            @include reset-pad-marg();
            padding-left: 15px;
            padding-right: 15px;
            margin-bottom: 30px;
            font-size: 0.9em;
        }
    }

    .project-block-top-bar {
        width: 100%;
        height: 45px;
        background-color: crimson;
    }

    .project-info-header {
        position: relative;
        width: 100%;
        margin-bottom: 25px;
    }

    .tech-stack-block {
        box-sizing: border-box;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;

        &__title {
            @include reset-pad-marg();
            margin-bottom: 15px;
            font-size: 1em;
            text-align: center;
        }

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding-bottom: 30px;
        }
    }

    .tech-stack-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
        @include reset-pad-marg();
        list-style-type: none;

        &__item {
            display: flex;
            padding: 5px 10px;
            @include border-radius(5px);
            background-color: #e4e4e4;
        }
    }

    .block-separator {
        display: none;


        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            align-self: center;
            display: block;
            width: 1px;
            height: 85%;
            background-color: #e4e4e4;
        }
    }

    .project-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 40px;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            align-self: center;
            flex-basis: 45%;
            padding-top: 50px;
            margin-top: 0;
        }

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            align-self: unset;
        }

        &__title {
            @include reset-pad-marg();
            margin-bottom: 15px;
            font-size: 1em;
            text-align: center;

            @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
                font-size: 1.2em;
            }
        }
    }

    .block-overlay {
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

</style>