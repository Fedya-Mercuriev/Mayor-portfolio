<template lang="pug">
    section#design
        H2(:appearance="appearance") {{ $t(blockTitle) }}
        BlockDescription(:appearance="appearance") {{ $t(blockDescription) }}
        template(v-if="!blockText")
            div.block-dummy
                div.block-dummy__icon-wrapper
                    NoteIcon
                p.block-dummy__text {{ `${$t(blockDummyText)}...` }}

</template>

<script>
    import H2 from 'Components/public/text-components/titles/level-2.vue';
    import BlockDescription from 'Components/public/text-components/block-description.vue';
    import NoteIcon from 'Root/svg/note-icon.svg';

    export default {
        components: {
            H2,
            BlockDescription,
            NoteIcon
        },
        props: {
            appearance: String
        },
        data() {
            return {
                blockTitle: 'design.title',
                blockDescription: 'design.description',
                blockText: "",
                blockDummyText: 'design.blockDummyText'
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

    .block-dummy {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;

        &__icon-wrapper {
            width: 40px;
            height: 40px;
            margin-right: 20px;
        }

        &__text {
            color: $primary-text-color;
        }
    }

    .note-icon {
        fill: #bbbbbb;
    }
</style>