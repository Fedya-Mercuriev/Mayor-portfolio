<template lang="pug">
    a.contained-btn(
        role="button"
        :class="[{'contained-btn-light': appearance === 'light'}, {'contained-btn-dark': appearance === 'dark'}, ...additionalClass]"
        :href="href"
        :target="linkTarget"
    )
        div.contained-btn__link-icon-wrapper(v-if="slotHasContent" :class="positionIcon")
            slot
        span.contained-btn__btn-text {{ $t(text) }}
</template>

<script>
    export default {
        name: "contained-button",
        props: {
            text: {
                type: String,
                require: true
            },
            href: {
                type: "String",
                required: false
            },
            // Если true, то ставит target как "_blank"
            goToNewPage: {
                type: "Boolean",
                required: false
            },
            appearance: {
                // Допустимые знаечения: "dark", "light"
                type: "String",
                required: true
            },
            iconPosition: {
                // Допустиые значения: "left", "right"
                type: "String",
                required: false
            },
            additionalClass: {
                type: "Object",
                required: false
            }
        },
        computed: {
            positionIcon() {
                if (!this.iconPosition) {
                    return '';
                } else {
                    return (this.iconPosition === 'left') ? '' : 'icon-right';
                }
            },
            linkTarget() {
                if (this.goToNewPage) {
                    return '_blank';
                }
            },
            slotHasContent() {
                return this.$slots.default;
            }
        }
    }
</script>

<style lang="scss">

    .contained-btn {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        padding: 14px 15px;
        @include border-radius($small-component-border-radius);
        text-decoration: none;
        letter-spacing: 1px;
        @include box-shadow(
                        0 3px 1px -2px rgba(0,0,0,.2),
                        0 2px 2px 0 rgba(0,0,0,.14),
                        0 1px 5px 0 rgba(0,0,0,.12)
        );
        @include transition(all 0.3s);
        cursor: pointer;

        &__link-icon-wrapper {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 13px;
        }

        &__btn-text {
            font-weight: 700;
            text-transform: uppercase;
        }
    }

    .contained-btn-light {
        color: $primary-text-color;
        background-color: $contained-button-light-bg;

        .button-icon {
            fill: $primary-text-color;

            &__icon-shape {
                fill: $primary-text-color;
            }
        }

        &:hover {
            background-color: darken($contained-button-light-bg, 10%);
        }

        &:active {
            color: $contained-button-clicked-color;
            background-color: darken($contained-button-light-bg, 10%);
        }
    }

    .contained-btn-dark {
        color: $contained-button-dark-color;
        background-color: $contained-button-dark-bg;

        .button-icon {
            fill: #ffffff;

            &__icon-shape {
                fill: #ffffff;
            }
        }

        &:hover {
            background-color: lighten($contained-button-dark-bg, 10%);
        }

        &:active {
            color: $contained-button-clicked-color;
            background-color: darken($contained-button-dark-bg, 10%);
        }
    }

    .icon-right {
        order: 1;
    }



</style>