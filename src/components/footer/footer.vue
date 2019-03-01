<template lang="pug">
    footer.footer
        div.footer__inner
            div.author-info
                span.author-info__text {{ `${$t(footer.text)}:` }}
                span.author-info__author-name {{ $t(footer.authorNick) }}
</template>

<script>
    export default {
        data() {
            return {
                footer: {
                    text: 'footer.text',
                    authorNick: 'footer.authorNick'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .footer {
        height: 40px;
        background-color: $primary-text-color;

        &__inner {
            display: flex;
            flex-direction: row;
            align-items: center;
            max-width: 1024px;
            height: 100%;
            margin: 0 auto;
        }
    }

    .author-info {
        width: 100%;
        padding-right: 20px;
        text-align: right;

        &__text {
            margin-right: 8px;
            color: $footer-text-color;
        }

        &__author-name {
            color: #ffffff;
        }
    }
</style>