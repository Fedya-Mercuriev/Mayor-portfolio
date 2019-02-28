<template lang="pug">
    div.dominant-media-card(
        :class="classList",
        @click="processClicks"
    )
        h3.dominant-media-card__title {{ $t(projectData.title) }}
        template(v-if="projectData.img")
            div.dominant-media-card__img-wrapper
                img.dominant-media-card__img(:src="projectData.img")
            div.dominant-media-card__overlay
        template(v-else)
            div.dominant-media-card__overlay
        span.dominant-media-card__hint-message {{ $t(hintMessage) }}
</template>

<script>
    export default {
        props: {
            projectData: {
                type: Object,
                required: true
            },
            appearance: String
        },
        data() {
            return {
                isClicked: false,
                screenSize: null,
                hintMessage: 'projectCard.viewMoreTxtDesktop'
            }
        },
        beforeMount() {
            this.setLinkMsg();
        },
        mounted() {
            this.$nextTick(function() {
                window.addEventListener('resize', this.setLinkMsg);
            })
        },
        computed: {
            classList() {
                return {
                    'project-card-primary': this.projectData.isPrimary,
                    'dominant-media-card--clicked': this.isClicked,
                    'dominant-media-card-light': this.appearance === 'light',
                    'dominant-media-card-dark': this.appearance === 'dark'
                }
            }
        },
        methods: {
            setLinkMsg() {
                if (window.outerWidth <= 1024) {
                    this.hintMessage = 'projectCard.viewMoreTxtMobile'
                } else {
                    this.hintMessage = 'projectCard.viewMoreTxtDesktop';
                }
            },
            processClicks() {
                if (window.outerWidth <= 1024) {
                    if (this.isClicked) {
                        this.isClicked = false;
                        this.$emit('checkout-project', this.key);
                    } else {
                        this.isClicked = true;
                    }
                } else {
                    this.$emit('checkout-project', this.key);
                }
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.setLinkMsg);
        }
    }
</script>

<style lang="scss" scoped>

    $componentBaseClass: dominant-media-card;

    .#{$componentBaseClass} {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        /*width: 80%;*/
        @include border-radius($medium-component-border-radius);
        overflow: hidden;
        background-color: $project-card-bg;
        @include box-shadow(
                        0 11px 15px -7px rgba(0,0,0,.2),
                        0 24px 38px 3px rgba(0,0,0,.14),
                        0 9px 46px 8px rgba(0,0,0,.12)
        );
        @include transform(scale(1));
        @include transition(all 0.27s);
        will-change: transform;

        // Начало стилей для элементов карточки
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
            font-size: 1.6em;
            color: $project-card-color;
            //-webkit-font-smoothing: antialiased;
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

        &__hint-message {
            position: absolute;
            bottom: 0;
            left: 0;
            @include transform(translateY(40px));
            display: block;
            width: 100%;
            text-align: center;
            font-size: 1.15em;
            //-webkit-font-smoothing: antialiased;
            color: $checkout-project-link-color;
            @include transition(transform 0.3s cubic-bezier(0.250, 0.250, 0.130, 0.910));
            will-change: transform;
        }
        // Конец стилей для элементов карточки

        // Правила для больших планшетов и для ПК
        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {

            .#{$componentBaseClass}__title {
                font-size: 1.25em;
            }

            .#{$componentBaseClass}__hint-message {
                bottom: -60px;
            }

            &:hover {
                @include transform(scale(0.97));

                .#{$componentBaseClass}__overlay {
                    background-color: rgba(0, 0, 0, 0.5);
                }

                /*.#{$componentBaseClass}__hint-message {
                    @include transform(translateY(-80px));
                }*/

                .#{$componentBaseClass}__title {
                    @include transform(translateY(-40px));
                }

                .#{$componentBaseClass}__hint-message {
                    @include transform(translateY(-70px));
                }
            }
        }
        // Конец правил для больших планшетов и для ПК

        /*
        ===========================================
            Обработка одинарного клика по карточке
        ===========================================
        */
        &--clicked {
            @include transform(scale(0.94));

            .#{$componentBaseClass}__overlay {
                background-color: rgba(0, 0, 0, 0.5);
            }

            // Правила для состояния ссылки "кликните еще раз" или "Подробнее" при клике на карточку
            .#{$componentBaseClass}__hint-message {
                @include transform(translateY(-40px));
            }

            @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
                .#{$componentBaseClass}__title {
                    @include transform(translateY(-30px));
                }

                .#{$componentBaseClass}__hint-message {
                    @include transform(translateY(-20px));
                }
            }
        }
    }

    .project-card-primary {

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {

            & .#{$componentBaseClass}__hint-message {
                font-size: 1em;
            }

            &:hover {

                & .#{$componentBaseClass}__title {
                    @include transform(translateY(-80px));
                }
            }
        }
    }
</style>