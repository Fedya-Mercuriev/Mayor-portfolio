<template lang="pug">
    ul.list-with-buttons(:class="appearanceClassList")
        li.list-with-buttons__list-item(v-for="item in data") {{ $t(item.text) }}
            template(v-if="item.hasCertificate && typeof item.hasCertificate === 'object'")
                div.list-with-buttons__button-wrapper
                    ContainedButton(
                        :text="'Сертификат'"
                        :href="item.hasCertificate.link"
                        :goToNewPage="true"
                        :appearance="'light'"
                        :iconPosition="'left'"
                    )
                        slot


</template>

<script>
    import ContainedButton from 'Components/public/buttons/contained-button.vue';

    export default {
        props: {
            data: Object,
            appearance: String,
        },
        components: {
            ContainedButton
        },
        computed: {
            appearanceClassList() {
                if (this.appearance === 'light') {
                    return 'list-with-buttons-light';
                } else {
                    return 'list-with-buttons-dark';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $list-class-name: list-with-buttons;

    .list-with-buttons {
        @include reset-pad-marg();
        padding: 0 20px;
        list-style-type: none;

        &__list-item {
            display: flex;
            flex-direction: column;
            padding: 10px 10px;
            @include border-radius($medium-component-border-radius);
            margin-bottom: 10px;
        }

        &__button-wrapper {
            padding: 20px 5% 5px 5%;
        }

        &__certificate-dumb {
            width: auto;
            padding: 10px 15px;
            @include border-radius(5px);
            margin-top: 10px;
            background-color: $cv-item-dumb-link-bg;
        }
    }

    .list-with-buttons-light {

        .#{$list-class-name}__list-item {
            color: $list-item-light-color;
            background-color: $list-item-light-bg;
        }
    }

    .list-with-buttons-dark {

        .#{$list-class-name}__list-item {
            color: $list-item-dark-color;
            background-color: $list-item-dark-bg;
        }
    }
</style>