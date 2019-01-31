<template lang="pug">
    div.project-view(v-show="!!projectInfo")
        //-include ../../../../pug-files/layouts/project-view-layout.pug
        div.project-block(v-if="projectInfo")
            a.close-block-btn(role="button")
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
            div.project-links
                h5.project-links__title Ссылки на проекты:
                template(v-if="projectInfo.links.checkout")
                    volume-link(:link="projectInfo.links.checkout") Посмотреть
                volume-link(:link="projectInfo.links.github") Github
</template>

<script>
    export default {
        props: [
            'projectInfo'
        ]
    }
</script>

<style lang="scss" scoped>

    .project-view {
        position: fixed;
        top: 100px;
        left: 50%;
        z-index: 990;
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
    }

    .project-block {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 450px;
        overflow-y: scroll;
    }

    .close-block-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10;
        width: 30px;
        height: 30px;
        @include border-radius(50%);
        background: pink;
    }

    .project-info {
        padding-top: 50px;

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
            background-color: pink;
        }
    }

    .project-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-top: 40px;

        &__title {
            @include reset-pad-marg();
            margin-bottom: 15px;
            font-size: 1em;
            text-align: center;
        }
    }

</style>