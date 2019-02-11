<template lang="pug">
    ul.list-with-buttons
        li.list-with-buttons__list-item(v-for="item in data") {{ item.text }}
                a.list-with-buttons__certificate-link(
                    v-if="item.hasCertificate && typeof item.hasCertificate === 'object'"
                    :href="item.hasCertificate.link"
                    target="_blank"
                )
                    span.certificate-link-icon
                    span.certificate-link-text посмотреть сертификат
                span.list-with-buttons__certificate-dumb(
                    v-else-if="item.hasCertificate && typeof item.hasCertificate === 'string'"
                ) {{ item.hasCertificate }}

</template>

<script>
    export default {
        props: ['data']
    }
</script>

<style lang="scss" scoped>

    .list-with-buttons {
        @include reset-pad-marg();
        padding: 0 20px;
        list-style-type: none;

        &__list-item {
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
            @include border-radius(5px);
            margin-bottom: 10px;
            /*align-items: center;*/
            /*justify-content: space-between;*/
            color: $cv-list-item-color;
            background-color: $cv-list-item-bg;
        }
        
        &__certificate-link {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 10px 15px;
            @include border-radius(5px);
            margin-top: 10px;
            color: #000000;
            font-size: 0.8em;
            text-decoration: none;
            background-color: #ffffff;
            @include box-shadow(
                            0 3px 1px -2px rgba(0,0,0,.2),
                            0 2px 2px 0 rgba(0,0,0,.14),
                            0 1px 5px 0 rgba(0,0,0,.12)
            );
            @include transition(all 0.3s);

            @media screen and (min-width: map-deep-get($devices, 'mobile-m') + 1px) {
                font-size: 1em;
            }

            &:hover {
                background-color: darken(#ffffff, 8%);
            }
        }

        &__certificate-dumb {
            width: auto;
            padding: 10px 15px;
            @include border-radius(5px);
            margin-top: 10px;
            background-color: $cv-item-dumb-link-bg;
        }
    }

    .certificate-link-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 15px;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e %3cpath fill='none' d='M0 0h24v24H0V0z'/%3e %3cpath fill='#000000' d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.9 13.98l2.1 2.53 3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68c.25.33.01.8-.4.8H6.02c-.42 0-.65-.48-.39-.81L8.12 14c.19-.26.57-.27.78-.02z'/%3e %3c/svg%3e");
        background-repeat: no-repeat;
    }
    
    .certificate-link-text {
        color: #000;
    }
</style>