<template lang="pug">
    include ../../../../pug-files/mixins/mixins.pug

    ul.secondary-navbar-menu(@hidePickLanguageBlock="")
        li.secondary-navbar-menu__menu-item
            form(method="GET")
                label(for="select-language") Язык
                select#select-language(v-model="selectedLanguage")
                    option(disabled value="") "Пожалуйста, выберите язык"
                    option(v-for="option in availableLanguages" :value="option.data") {{ option.text }}
            // - Этот блок показывается на десктопной версии
            PickLanguageBlock
        li.secondary-navbar-menu__menu-item
            +linkToNewPage('privacy-policy', "Политика конфиденциальности")(class="secondary-navbar-menu__menu-link")
</template>

<script>
    import PickLanguageBlock from './pick-language-block/index.vue';

    export default {
        name: "secondary-navbar-menu",
        components: {
            PickLanguageBlock
        },
        data() {
            return {
                mainDomain: "https://mayor-mayor.com",
                linkData: {
                    text: "Политика конфиденциальности",
                    address: `privacy-policy`
                },
                // value - адрес страницы на конкретном языке
                availableLanguages: [
                    {
                        text: "Русский",
                        data: "ru"
                    },
                    {
                        text: "English",
                        data: "en"
                    },
                    {
                        text: "简体中文",
                        data: "zh"
                    }
                ]
            }
        },
        computed: {
        },
        methods: {
            setSelectedValue(value) {
                this.value = value;
            }
        }
    }
</script>

<style scoped>

</style>