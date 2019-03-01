<template lang="pug">
    section#design
        H2(:appearance="appearance") {{ $t(blockTitle) }}
        BlockDescription(:appearance="appearance") {{ $t(blockDescription) }}
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
                blockTitle: 'design.title',
                blockDescription: 'design.description'
            }
        }
    }
</script>

<style lang="scss" scoped>
    #design {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;

        @media screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            margin-bottom: 60px;
        }
    }
</style>