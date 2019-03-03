<template lang="pug">
    a.text-btn(
        role="button"
        :class="[{'text-btn-light': appearance === 'light'}, {'text-btn-dark': appearance === 'dark'}]"
        :href="href"
        :target="linkTarget"
    )
        div.link-icon-wrapper(v-if="slotHasContent" :class="positionIcon")
            slot
        span.text-btn__btn-text {{ $t(text) }}

</template>

<script>
    export default {
        props: {
            text: {
                type: "String",
                required: true
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
            }
        },
        computed: {
            positionIcon() {
                if (!this.iconPosition) {
                    return '';
                } else {
                    return (this.iconPosition === 'left') ? 'icon-left' : 'icon-right';
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

    .text-btn {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        padding: 10px 15px;
        cursor: pointer;
    }

    .link-icon-wrapper {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 13px;
    }

    // Класс применяетсяк обертке для иконки
    .icon-left {
        order: 1;
    }

    .icon-right {
        order: 2;
    }

    .text-btn-light {
        color: $primary-text-color;
        letter-spacing: 1px;
        @include transition(all 0.3s);

        @media only screen and (min-width: map-deep-get($devices, 'desktop')) {

            &:hover {
                color: lighten($primary-text-color, 10%);
            }

            &:active {
                color: $text-button-clicked-color;
            }
        }

        &--clicked {
            color: $text-button-clicked-color
        }
    }

    .text-btn-dark {
        color: $text-button-dark-color;
    }
</style>