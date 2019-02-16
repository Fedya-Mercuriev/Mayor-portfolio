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
                        a(class="volume-link volume-link-light" :href="projectInfo.links.checkout" target="_blank")
                            span.volume-link__link-text Посмотреть
                    a(class="volume-link volume-link-dark" :href="projectInfo.links.github" target="_blank")
                        div.volume-link__icon-block
                        span.volume-link__link-text Github

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
                background-color: darken($close-project-btn-bg, 15%);
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

    $volume-link-base-class: volume-link;

    .volume-link {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        min-height: 20px;
        padding: 10px 20px;
        @include border-radius(5px);
        margin-bottom: 25px;
        text-decoration: none;
        @include box-shadow(
                        0 3px 1px -2px rgba(0,0,0,.2),
                        0 2px 2px 0 rgba(0,0,0,.14),
                        0 1px 5px 0 rgba(0,0,0,.12)
        );
        @include transition(background-color 0.28s);

        &-light {
            background-color: $volume-link-light-bg;

            &:hover {
                background-color: darken($volume-link-light-bg, 15%);
            }

            .#{volume-link}__link-text {
                color: #000000;
            }
        }

        &-dark {
            background-color: $volume-link-dark-bg;

            .#{volume-link}__icon-block {
                /*background-image: url("../../../../svg/github-icon.svg");*/
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32.58 31.77'%3e %3cdefs%3e %3cstyle%3epath %7bfill:white%3bfill-rule:evenodd%3b%7d%3c/style%3e %3c/defs%3e %3cpath d='M152.61%2c107.44a16.29%2c16.29%2c0%2c0%2c0-5.15%2c31.75c.81.15%2c1.11-.35%2c1.11-.79s0-1.41%2c0-2.77c-4.53%2c1-5.49-2.18-5.49-2.18a4.31%2c4.31%2c0%2c0%2c0-1.81-2.38c-1.48-1%2c.11-1%2c.11-1a3.42%2c3.42%2c0%2c0%2c1%2c2.5%2c1.68%2c3.47%2c3.47%2c0%2c0%2c0%2c4.74%2c1.35%2c3.48%2c3.48%2c0%2c0%2c1%2c1-2.18c-3.62-.41-7.42-1.81-7.42-8.05a6.3%2c6.3%2c0%2c0%2c1%2c1.68-4.37%2c5.86%2c5.86%2c0%2c0%2c1%2c.16-4.31s1.37-.44%2c4.48%2c1.67a15.44%2c15.44%2c0%2c0%2c1%2c8.16%2c0c3.11-2.11%2c4.48-1.67%2c4.48-1.67a5.85%2c5.85%2c0%2c0%2c1%2c.16%2c4.31%2c6.29%2c6.29%2c0%2c0%2c1%2c1.67%2c4.37c0%2c6.26-3.81%2c7.63-7.44%2c8a3.89%2c3.89%2c0%2c0%2c1%2c1.11%2c3c0%2c2.18%2c0%2c3.93%2c0%2c4.47s.29.94%2c1.12.78a16.29%2c16.29%2c0%2c0%2c0-5.16-31.74Z' transform='translate(-136.32 -107.44)'/%3e %3c/svg%3e");
                background-repeat: no-repeat;
                background-size: contain;
            }

            &:hover {
                background-color: lighten($volume-link-dark-bg, 15%);
            }

            .#{volume-link}__link-text {
                color: #ffffff;
            }
        }

        &__icon-block {
            width: 20px;
            height: 20px;
            margin-right: 10px;
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