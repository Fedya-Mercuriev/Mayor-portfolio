<template lang="pug">
    section#portfolio
        h2.block-title Портфолио
        p.block-description Здесь собрана часть моих работ, которыми можно покичиться
        div.project-cards-wrapper(@click="processCardClicks")
            project-card(
                v-for="(project, key) in projects"
                key="key"
                :projectData="project"
                @checkout-project="openProject(project)"
            )
        project-view(
            v-show="projectWindowShown"
            :projectInfo="currentlyOpenedProjectData"
            @hide-window="closeProject"
        )
</template>

<script>
    import ProjectCard from './project-card/index.vue';
    import ProjectView from './project-views/index.vue';

    export default {
        components: {
            ProjectCard,
            ProjectView
        },
        data() {
            return {
                projects: {
                    bot: {
                        // BF-Bot
                        isPrimary: true,
                        title: "Бот для цветочного магазина",
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
                        title: "Карточки для отображения товаров",
                        img: "#",
                        description: "Описание",
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
                        title: "JS-реализация игры \"Calculator\" для iOS",
                        img: "https://lh3.googleusercontent.com/6bTb8lOVZ_r2oAVjMfEAPQVqvc_fJeaueqXYbsM6Orq070Fk9Rxzdaxx77j89asBY64",
                        description: "Описание",
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
                        title: "Портфолио",
                        // img: "#",
                        description: "Описание",
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

</style>