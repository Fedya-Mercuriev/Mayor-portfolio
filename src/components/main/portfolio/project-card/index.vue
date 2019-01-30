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
        a.project-card__checkout-project-link {{ linkMsg }}
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
                isClicked: false,
                screenSize: null,
                linkMsg: "Подробнее"
            }
        },
        beforeMount() {
            this.screenSize = this.setLinkMsg();

            this.setLinkMsg();
        },
        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.setLinkMsg);
            })
        },
        methods: {
            setLinkMsg() {
                if (window.outerWidth <= 768) {
                    this.linkMsg = "Кликните еще раз"
                } else {
                    this.linkMsg = "Подробнее";
                }
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.setLinkMsg);
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
        @include transform(scale(1));
        @include transition(all 0.27s);

        /*&:nth-last-child(-n+1) {}*/

        // Правила для последней карточки

        @media screen and (min-width: map-deep-get($devices, 'mobile-m') + 1px) {
            width: 75%;
            margin-bottom: 20px;
        }

        @media screen and (max-width: map-deep-get($devices, 'mobile-l')) {
            @include border-radius(7px);
        }

        // Правила для планшета для карточек

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            width: 45%;
            @include border-radius(12px);

            /*
                Стили для последних двух карточек
            */

            &:nth-last-child(-n+2) {
                width: 93%;

                // При клике ссылка смезается на 20px

                &::after {
                    padding-bottom: 20%;
                }

                //&--is-clicked {

                  //  #{$componentBaseClass}__checkout-project-link {
                    //    @include transform(translateY(-40px));
                    //}
                //}
            }
        }

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            float: left;
            width: 20%;
            margin: 15px 20px;
            cursor: pointer;

            .#{$componentBaseClass}__title {
                font-size: 1.25em;
            }

            .#{$componentBaseClass}__checkout-project-link {
                bottom: -60px;
            }

            &:hover {
                @include transform(scale(0.97));

                .#{$componentBaseClass}__overlay {
                    background-color: rgba(0, 0, 0, 0.5);
                }

                .#{$componentBaseClass}__checkout-project-link {
                    @include transform(translateY(-80px));
                }
            }

            &:nth-last-child(-n+2) {
                width: 20%;

                &::after {
                    padding-bottom: 100%;
                }
            }

            &:nth-last-child(1) {
                width: 44%;
                background-color: #5f5f5f;

                &::after {
                    padding-bottom: 20%;
                }

                &:hover {

                    .#{$componentBaseClass}__title {
                        transform: translateY(-25px);
                    }

                    .#{$componentBaseClass}__checkout-project-link {
                        @include transform(translateY(-73px));
                    }
                }
            }
        }

        &::after {
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

        /*
            Обработка одинарного клика по карточке
        */

        &--clicked {
            @include transform(scale(0.94));

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

    .project-card-primary {

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            width: 35%;
            margin-top: 0;
            margin-left: 90px;
            font-size: 1.7em;

            & .#{$componentBaseClass}__checkout-project-link {
                font-size: 1em;
            }
        }
    }

</style>