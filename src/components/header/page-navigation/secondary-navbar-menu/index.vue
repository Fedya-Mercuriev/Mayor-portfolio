<template src="./template.pug" lang="pug">

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