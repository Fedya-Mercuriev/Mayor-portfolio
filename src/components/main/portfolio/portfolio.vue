<template lang="pug">
    section#portfolio
        H2(:appearance="appearance") {{ $t(blockTitle) }}
        BlockDescription(:appearance="appearance") {{ $t(blockDescription) }}
        div.project-cards-wrapper(@click="processCardClicks")
            div.card-wrapper(
                v-for="(project, key) in projects"
                key="key"
                :class="{'card-wrapper-primary': project.isPrimary}"
            )
                DominantMediaCard(
                    :projectData="project"
                    @checkout-project="openProject(project)"
                )
        project-view(
            v-show="projectWindowShown"
            :appearance="appearance"
            :popUp="projectWindowShown"
            :projectInfo="currentlyOpenedProjectData"
            @hide-window="closeProject"
        )
</template>

<script>
    import H2 from 'Components/public/text-components/titles/level-2.vue';
    import BlockDescription from 'Components/public/text-components/block-description.vue';
    import DominantMediaCard from 'Components/public/cards/dominant-media-card.vue';
    import ProjectView from './project-view/index.vue';

    export default {
        components: {
            H2,
            BlockDescription,
            DominantMediaCard,
            ProjectView
        },
        props: {
            appearance: String
        },
        data() {
            return {
                blockTitle: 'portfolio.blockTitle',
                blockDescription: 'portfolio.blockDescription',
                projects: {
                    bot: {
                        // BF-Bot
                        isPrimary: true,
                        title: 'bfBot.title',
                        img: "https://png.pngtree.com/element_origin_min_pic/17/09/11/20d1ee2fbd551c54365fc42fc9768180.jpg",
                        description: "Значимость этих проблем настолько очевидна, что консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации новых предложений. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.",
                        stack: ['ES6', 'Telegraf', 'Node.js'],
                        links: {
                            checkout: "https://t-do.ru/blumenfrauBot",
                            github: "https://github.com/Fedya-Mercuriev/bf-bot"
                        },
                        pride: 55,
                        date: new Date(2019, 1, 16)
                    },
                    cards: {
                        // Creonit test
                        isPrimary: false,
                        title: 'cards.title',
                        img: "#",
                        description: "Значимость этих проблем настолько очевидна, что консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации новых предложений. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.",
                        stack: ['ES6', 'JQuery', 'Pug', 'SCSS'],
                        links: {
                            checkout: false,
                            github: "https://github.com/Fedya-Mercuriev/creonit-test-pt2"
                        },
                        pride: 50,
                        date: new Date(2018, 11, 12)
                    },
                    calculator: {
                        // Calculator
                        isPrimary: false,
                        title: 'calculator.title',
                        img: "https://lh3.googleusercontent.com/6bTb8lOVZ_r2oAVjMfEAPQVqvc_fJeaueqXYbsM6Orq070Fk9Rxzdaxx77j89asBY64",
                        description: "Значимость этих проблем настолько очевидна, что консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации новых предложений. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.",
                        stack: ['Vanilla JS (ES5)'],
                        links: {
                            checkout: "https://fedya-mercuriev.github.io/calculator-game/",
                            github: "https://github.com/Fedya-Mercuriev/calculator-game"
                        },
                        pride: 20,
                        date: new Date(2018, 1, 11)
                    },
                    portfolio: {
                        // Портфолио
                        isPrimary: false,
                        title: 'thisApp.title',
                        // img: "#",
                        description: "Значимость этих проблем настолько очевидна, что консультация с широким активом в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации новых предложений. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач.",
                        stack: ['Vue.js', 'ES6', 'Pug', 'SCSS'],
                        links: {
                            checkout: "#",
                            github: "https://github.com/Fedya-Mercuriev/calculator-game"
                        },
                        date: new Date()
                    }
                },
                currentlyOpenedProjectData: null,
                projectWindowShown: false
            }
        },
        methods: {
            openProject(projectData) {
                this.currentlyOpenedProjectData = projectData;
                this.projectWindowShown = true;
                // Заблокируем пролистывание
                let blockScroll = this.$parent.controlScroll;
                blockScroll(true);
            },
            closeProject() {
                this.projectWindowShown = false;
                // Разблокируем пролистывание
                let blockScroll = this.$parent.controlScroll;
                blockScroll(false);

            },
            processCardClicks(event) {
                this.$children.forEach((component) => {
                    if (event.target.parentElement !== component.$el) {
                        component.isClicked = false
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    #portfolio {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 60px;
    }
    
    .project-cards-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
        }

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            display: block;
            box-sizing: border-box;
            max-width: 1024px;
            padding: 0 20px;
        }
    }

    .card-wrapper {
        width: 85%;
        margin-bottom: 30px;

        &::after {
            content: "";
            display: block;
        }

        @media screen and (min-width: map-deep-get($devices, 'mobile-m') + 1px) {
            width: 75%;
        }

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            width: 45%;

            //Стили для последних двух карточек
            &:nth-last-child(-n+2) {
                width: 93%;

                // Размер последних двух карточек в 5 раз меньше первых двух
                & > div::after {
                    padding-bottom: 20%;
                }
            }
        }

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            float: left;
            width: 20%;
            margin: 15px 20px;
            cursor: pointer;

            &:nth-last-child(-n+2) {
                float: left;
                width: 20%;
                margin: 15px 20px;
                cursor: pointer;

                & > div::after {
                    padding-bottom: 100%;
                }
            }

            &:nth-last-child(1) {
                width: 44%;

                & > div::after {
                    padding-bottom: 20%;
                }

                &::after {
                    padding-bottom: 0;
                }
            }
        }
    }

    .card-wrapper-primary {

        @media screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            width: 35%;
            margin-top: 0;
            margin-left: 80px;
            font-size: 1.7em;

            &::after {
                padding-bottom: 0;
            }
        }
    }

</style>