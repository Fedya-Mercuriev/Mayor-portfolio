<template lang="pug">
    div#portfolio(@checkout-project="currentlyOpenedProject = openSelectedProject")
        h2.block-title Портфолио
        p.block-description Здесь собрана часть моих работ, которыми можно покичиться
        div.project-cards-wrapper
            project-card(
                v-for="(project, key) in projects"
                key="key"
                :projectData="project"
                @click="currentlyOpenedProject = project"
            )

        a.root-link(href="https://github.com/Fedya-Mercuriev?tab=repositories" target="_blank") Больше проектов
</template>

<script>
    import ProjectCard from './project-card/index.vue';

    export default {
        components: {
            ProjectCard
        },
        data() {
            return {
                projects: {
                    bot: {
                        // BF-Bot
                        isPrimary: true,
                        title: "Бот для цветочного магазина",
                        img: "https://png.pngtree.com/element_origin_min_pic/17/09/11/20d1ee2fbd551c54365fc42fc9768180.jpg",
                        description: "",
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
                        description: "",
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
                        description: "",
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
                        description: "",
                        stack: ['Vue.js', 'ES6', 'Pug', 'SCSS'],
                        links: {
                            checkout: "https://fedya-mercuriev.github.io/calculator-game/",
                            github: "https://github.com/Fedya-Mercuriev/calculator-game"
                        },
                        date: new Date()
                    }
                },
                currentlyOpenedProject: null
            }
        },
        methods: {
            openSelectedProject(key) {
                return this.projects[key];
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

    .block-title {
        @include reset-pad-marg();
        margin-top: 20px;
        margin-bottom: 16px;
        color: $block-title-color;

        @media screen and (max-width: map-deep-get($devices, 'mobile-l')) {
            font-size: 2em;
        }

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            font-size: 3.3em;
        }
    }

    .block-description {
        @include reset-pad-marg();
        margin-bottom: 30px;
        color: $block-description-color;
        text-align: center;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            font-size: 1.2em;
        }
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
            /*flex-direction: row;*/
            /*flex-wrap: wrap;*/
            /*align-items: flex-end;*/
            /*justify-content: space-between;*/
            display: block;
            box-sizing: border-box;
            max-width: 1024px;
            padding: 0 20px;
        }

    }

</style>