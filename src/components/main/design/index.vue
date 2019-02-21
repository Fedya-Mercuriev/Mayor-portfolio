<template lang="pug">
    section#design
        H2(:appearance="appearance") {{ blockTitle }}
        BlockDescription(:appearance="appearance") {{ blockDescription }}
</template>

<script>
    import H2 from 'Components/public/text-components/titles/level-2.vue';
    import BlockDescription from 'Components/public/text-components/block-description.vue';
    export default {
        components: {
            H2,
            BlockDescription
        },
        props: {
            appearance: String
        },
        data() {
            return {
                blockTitle: "Дизайн китайских сайтов",
                blockDescription: "Маленькое описание для раздела про дизайн китайских сайтов"
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>