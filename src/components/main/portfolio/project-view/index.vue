<template lang="pug">
div
    //- transition(name="project-view-appear")
    div.project-view(
        :style="styles"
        :class="[{'project-view-light': appearance === 'light'}, {'project-view-dark': appearance === 'dark'}]"
    )
        div.project-block(v-if="projectInfo")
            a.close-block-btn(role="button" @click="hideWindow")
                i.close-block-btn__stroke
                i.close-block-btn__stroke

            // Начало блока с информацией о проекте (заголовок, описание)
            div.project-info
                header.project-info-header
                    h4.project-info__title {{ $t(projectInfo.title) }}
                p.project-info__description {{ $t(projectInfo.description) }}
                template(v-if="projectInfo.stack")
                    div.tech-stack-block
                        h5.tech-stack-block__title {{ `${$t(techStackBlockTitle)}:` }}
                        ul.tech-stack-list
                            li.tech-stack-list__item(v-for="item in projectInfo.stack") {{ item }}
            // Конец блока с информацией о проекте (заголовок, описание)

            i.block-separator

            // Начало блока с ссылками на проект
            div.project-links
                h5.project-links__title {{ `${$t(projectLinksTitle)}:` }}
                template(v-if="projectInfo.links.checkout")
                    div.project-links__btn-wrapper
                        ContainedButton(
                            :text="btnText"
                            :href="projectInfo.links.checkout"
                            :appearance="appearance"
                            :goToNewPage="true"
                        )
                div.project-links__btn-wrapper
                    ContainedButton(
                        :text="'Github'"
                        :href="projectInfo.links.github"
                        :appearance="appearance"
                        :goToNewPage="true"
                        :additionalClass="'github-link'"
                    )
                        GithubIcon
            // Конец блока с ссылками на проект


    div.block-overlay(
        @click="hideWindow"
    )


</template>

<script>
    import ContainedButton from 'Components/public/buttons/contained-button.vue';
    import GithubIcon from 'Root/svg/github-icon.svg';

    export default {
        components: {
            ContainedButton,
            GithubIcon
        },
        props: {
            appearance: String,
            projectInfo: Object,
            popUp: Boolean
        },
        data() {
            return {
                techStackBlockTitle: 'projectViewBlock.techStackBlockTitle',
                projectLinksTitle: 'projectViewBlock.projectLinksTitle',
                btnText: 'projectViewBlock.btnText'
            }
        },
        computed: {
            styles() {
                if (this.popUp) {
                    return {
                        opacity: 1,
                        transform: 'translate(-50%) scale(1)'
                    }
                } else {
                    return {}
                }
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

    $projectInfoBaseClass: project-info;
    $techStackBlockClass: tech-stack-block;
    $techStackListClass: tech-stack-list;
    $projectLinksBlockClass: project-links;

    .project-view {
        position: fixed;
        top: 100px;
        left: 50%;
        z-index: 10000;
        width: 90%;
        @include border-radius(7px);
        @include transform(translate(0) scale(0.8));
        @include box-shadow(
                        0 11px 15px -7px rgba(0,0,0,.2),
                        0 24px 38px 3px rgba(0,0,0,.14),
                        0 9px 46px 8px rgba(0,0,0,.12)
        );
        @include transition(all 0.3s);
        will-change: transform;
        opacity: 0;
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
        -webkit-overflow-scrolling: touch;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            flex-direction: row;
            align-items: unset;
            overflow-y: unset;
        }
    }

    .project-view-light {
        background-color: #ffffff;

        .#{$projectInfoBaseClass}__title {
            color: $title-light-color;
        }

        .#{$projectInfoBaseClass}__description {
            color: $block-description-light-color;
        }

        .#{$techStackBlockClass}__title {
            color: $title-light-color;
        }

        .#{$techStackListClass}__item {
            border: 1px solid #e4e4e4;
            color: $list-item-light-color;
            background-color: $list-item-light-bg;
        }

        .#{$projectLinksBlockClass}__title {
            color: $title-light-color;
        }
    }

    .project-view-dark {
        background-color: #344955;

        .#{$projectInfoBaseClass}__title {
            color: $title-dark-color;
        }

        .#{$projectInfoBaseClass}__description {
            color: $block-description-dark-color;
        }

        .#{$techStackBlockClass}__title {
            color: $title-dark-color;
        }

        .#{$techStackListClass}__item {
            color: $list-item-dark-color;
            background-color: $list-item-dark-bg;
        }

        .#{$projectLinksBlockClass}__title {
            color: $title-dark-color;
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
            color: $primary-text-color;
        }

        &__description {
            @include reset-pad-marg();
            padding-left: 15px;
            padding-right: 15px;
            margin-bottom: 30px;
            font-size: 0.9em;
            color: $primary-text-color;
        }
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
            margin-bottom: 12px;
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
        box-sizing: border-box;
        width: 100%;
        padding: 0 25px;
        margin-top: 40px;

        @media screen and (min-width: map-deep-get($devices, 'mobile-m') + 1px) {
            padding: 0 35px;
        }

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

        &__btn-wrapper {
            margin-bottom: 20px;

            @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
                padding: 0 20px;
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

    .project-view-appear-enter-active {
        transition: all .3s;
    }

    .project-view-appear-leave-active {
        transition: all .3s;
    }

    .project-view-appear-enter, .project-view-appear-leave-to {
        @include transform(translateY(0) scale(0.8));
        opacity: 0;
    }

</style>