<template src="./template.pug" lang="pug">

</template>

<script>
    export default {
        // props: ['langData'],
        data() {
            return {
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
                ],
                pickLanguageBlockShown: false
            }
        },
        methods: {
            pickLanguage(event) {
                this.$emit('click', event.target.language);
            },
            hideThisBlock() {
                this.$emit('hidePickLanguageBlock');
            }
        }
    }
</script>

<style scoped>

</style>