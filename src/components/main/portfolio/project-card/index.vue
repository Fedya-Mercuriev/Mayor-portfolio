<template lang="pug">
    div.project-card(
        :class="{'project-card-primary': projectData.isPrimary, 'project-card--clicked': isClicked}",
        @click="isClicked = !isClicked"
    )
        h3.project-card__title {{ projectData.title }}
        template(v-if="projectData.img")
            div.project-card__img-wrapper
                img.project-card__img(:src="projectData.img")
                div.project-card__overlay
        template(v-else)
            div.project-card__overlay
        template(v-if="isMobile()")
            a.project-card__checkout-project-link Кликните еще раз
        template(v-else)
            a.project-card__checkout-project-link Подробнее
</template>

<script>
    export default {
        name: "project-card",
        props: {
            projectData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                isClicked: false
            }
        },
        methods: {
            isMobile() {
                if (window.clientWidth <= 768) {
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style lang="scss" scoped>

    $componentBaseClass: project-card;

    .project-card {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        @include border-radius(5px);
        margin-bottom: 15px;
        overflow: hidden;
        background-color: $project-card-bg;
        @include box-shadow(
                        0 11px 15px -7px rgba(0,0,0,.2),
                        0 24px 38px 3px rgba(0,0,0,.14),
                        0 9px 46px 8px rgba(0,0,0,.12)
        );

        &:nth-last-child(-n+1) {
            background-color: #5f5f5f;
        }


        @media screen and (min-width: map-deep-get($devices, 'mobile-m') + 1px) {
            width: 75%;
            margin-bottom: 20px;
        }

        @media screen and (max-width: map-deep-get($devices, 'mobile-l')) {
            @include border-radius(7px);
        }

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            width: 45%;
            @include border-radius(12px);

            &:nth-last-child(-n+2) {
                width: 93%;

                // При клике ссылка смезается на 20px

                &::after {
                    padding-bottom: 20%;
                }

                &--is-clicked {

                    #{$componentBaseClass}__checkout-project-link {
                        @include transform(translateY(-40px));
                    }
                }
            }
        }

        &:after {
            content: "";
            display: block;
            padding-bottom: 100%;
        }

        &__title {
            position: absolute;
            top: 50%;
            z-index: 10;
            @include transform(translateY(-50%));
            @include reset-pad-marg();
            font-size: 1.8em;
            color: $project-card-color;
            text-align: center;
            @include transition(all 0.3s);

            @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
                width: 100%;
                font-size: 1.7em;
            }

        }

        &__img-wrapper {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 100%;
            text-align: center;
        }

        &__overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            @include transition(background-color 0.3s)
        }

        &__img {
            height: 100%;
        }

        &__checkout-project-link {
            position: absolute;
            bottom: -20px;
            font-size: 1.15em;
            color: $checkout-project-link-color;
            @include transition(all 0.3s cubic-bezier(0.250, 0.250, 0.130, 0.910));
        }

        &--clicked {

            .#{$componentBaseClass}__overlay {
                background-color: rgba(0, 0, 0, 0.5);
            }

            .#{$componentBaseClass}__checkout-project-link {
                @include transform(translateY(-80px));
            }

            @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
                &:nth-last-child(-n+2) {

                    .#{$componentBaseClass}__title {
                        @include transform(translateY(-30px));
                    }

                    .#{$componentBaseClass}__checkout-project-link {
                        @include transform(translateY(-40px));
                    }
                }
            }
        }
    }

</style>

<!--isPrimary: true,-->
<!--title: "Бот для цветочного магазина",-->
<!--img: "#",-->
<!--description: "",-->
<!--stack: ['ES6', 'Telegraf', 'Node.js'],-->
<!--links: {-->
<!--checkout: "https://t-do.ru/blumenfrauBot",-->
<!--github: "https://github.com/Fedya-Mercuriev/bf-bot"-->
<!--}-->