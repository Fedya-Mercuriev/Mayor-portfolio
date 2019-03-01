<template lang="pug">
    section#cv
        H2(:appearance="appearance") {{ $t(title) }}
        BlockDescription(:appearance="appearance") {{ $t(description) }}
        ContentWrapper(:data="cvData" :appearance="appearance")
        template(v-for="cvItem in cvData")
            template(v-if="typeof cvItem.data === 'string'")
                H3(:appearance="appearance") {{ $t(cvItem.title) }}
                Paragraph(:appearance="appearance") {{ $t(cvItem.data) }}

</template>

<script>
    import H2 from 'Components/public/text-components/titles/level-2.vue';
    import H3 from 'Components/public/text-components/titles/level-3.vue';
    import Paragraph from 'Components/public/text-components/paragraph.vue';
    import BlockDescription from 'Components/public/text-components/block-description.vue';
    import ContentWrapper from './content-wrapper/content-wrapper.vue';

    export default {
        components: {
            H2,
            H3,
            Paragraph,
            BlockDescription,
            ContentWrapper
        },
        props: {
            appearance: String
        },
        data() {
            return {
                title: 'cvBlock.title',
                description: 'cvBlock.description',
                cvData: {
                    education: {
                        title: 'education.title',
                        description: 'education.description',
                        data: [{
                            text: 'education.data.univ1'
                        }, {
                            text: 'education.data.univ2'
                        }]
                    },
                    spokenLanguages: {
                        title: 'spokenLanguages.title',
                        description: 'spokenLanguages.description',
                        data: [{
                            text: 'spokenLanguages.data.lang1'
                        }, {
                            text: 'spokenLanguages.data.lang2'
                        }]
                    },
                    courses: {
                        title: 'courses.title',
                        description: 'courses.description',
                        data: [{
                            text: "Brilliant – Computer Science (Brilliant.ru)",
                            hasCertificate: false
                        }, {
                            text: "Воркшоп «Яндекс Перемена» (г. Новосибирск)",
                            hasCertificate: false
                        }, {
                            text: "Яндекс – Тонкости Верстки (Coursera)",
                            hasCertificate: false
                        }, {
                            text: "HTML Академия – Базовый HTML и CSS",
                            hasCertificate: "скачан с торрента"
                        }, {
                            text: "HTML Академия – Продвинутый HTML и CSS",
                            hasCertificate: "скачан с торрента"
                        }, {
                            text: "Learn.javascript – Javascript/DOM/Интерфейсы",
                            hasCertificate: {
                                link: "https://learn.javascript.ru/courses/js-20180918/gleb-gorkoltzev/ru/certificate.jpg"
                            }
                        }]
                    },
                    stack: {
                        title: 'techStack.title',
                        description: 'techStack.description',
                        data: ["HTML5", "CSS3", "JS (ES5, ES6)", "Vue.js", "LESS", "SCSS", "Pug"]
                    },
                    graphicSoftware: {
                        title: 'graphicSoftware.title',
                        description: 'graphicSoftware.description',
                        data: ["Photoshop", "Sketch", "Figma", "Illustrator"]
                    },
                    coreSkills: {
                        title: 'coreSkills.title',
                        description: 'coreSkills.description',
                        data: [{
                            text: 'coreSkills.data.skill1'
                        }, {
                            text: 'coreSkills.data.skill2'
                        }, {
                            text: 'coreSkills.data.skill3'
                        }]
                    },
                    nonCoreSkills: {
                        title: 'nonCoreSkills.title',
                        description: 'nonCoreSkills.description',
                        data: [{
                            text: 'nonCoreSkills.data.skill1'
                        }, {
                            text: 'nonCoreSkills.data.skill2'
                        }]
                    },
                    extra: {
                        title: 'extra.title',
                        description: 'extra.description',
                        data: [{
                            text: 'extra.data.extra1'
                        }, {
                            text: 'extra.data.extra2'
                        }, {
                            text: 'extra.data.extra3'
                        }]
                    },
                    about: {
                        title: 'about.title',
                        data: 'about.data'
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    #cv {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;

        @media screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            margin-bottom: 60px;
        }
    }
</style>