<template lang="pug">
    div
        transition(name="slide-fade")
            a.link-to-locale-page(:href="language" v-show="langChosen") Перейти
</template>

<script>
    export default {
        props: {
            langChosen: {
                type: 'Boolean',
                required: true
            },
            language: {
                type: 'String',
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

    .link-to-locale-page {
        position: absolute;
        top: 0;
        left: 50%;
        @include transform(translateX(-50%) translateY(50px));
        display: block;
        padding: 15px 50px;
        @include border-radius($small-component-border-radius);
        font-size: 1.2em;
        color: $primary-text-color;
        text-decoration: none;
        background-color: $primary-bg-color;

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            @include transform(translateX(-50%) translateY(60px));
        }
    }

    // Стили для Vue Transitions
    .slide-fade-enter-active {
        @include transition(all 0.3s cubic-bezier(.13,.9,.6,.97));
    }

    .slide-fade-leave-active {
        @include transition(all 0.3s cubic-bezier(.13,.9,.6,.97));
    }

    .slide-fade-enter {
        @include transform(translateX(-50%) translateY(0px));
        opacity: 0;
    }

    .slide-fade-leave-to {
        @include transform(translateX(-50%) translateY(0px));
        opacity: 0;
    }

</style>