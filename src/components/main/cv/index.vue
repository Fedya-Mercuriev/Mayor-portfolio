<template lang="pug">
    div#cv
        h2.block-title Резюме
        p.block-description А это резюме. Да
        div.cv-content-wrapper
            div.cv-item-wrapper(v-for="item in cvData")
                h3.cv-item-title {{ item.title }}
                p.cv-item-description {{ item.description }}
                template(v-if="getItemType(item.data) === 'text'")
                    TextField(:data="item.data" :state="'light'")
                template(v-else)
                    CellList(v-if="pickAppropriateList(item) === 'cell'" :data="item.data")
                    ListWithButtons(v-else-if="pickAppropriateList(item) === 'with-buttons'" :data="item.data")
                    OrdinaryList(v-else :data="item.data")

</template>

<script>
    import Vue from 'vue';
    import CellList from './items/cell-list/index.vue';
    import ListWithButtons from './items/list-with-links/index.vue';
    import OrdinaryList from './items/ordinary-list/index.vue';
    import TextField from './items/text-field/index.vue';

    export default {
        components: {
            CellList,
            ListWithButtons,
            OrdinaryList,
            TextField
        },
        data() {
            return {
                cvData: {
                    education: {
                        title: "Высшее образование",
                        description: "Корочки",
                        data: [{
                            text: "Томский политехнический университет (2013 - 2018)"
                        }, {
                            text: "Харбинский политехнический университет (2017)"
                        }]
                    },
                    spokenLanguages: {
                        title: "Владение языками",
                        description: "Читаю на этих языках документацию и общаюсь на них за бутылкой пива",
                        data: [{
                            text: "Английский (владею свободно: IELTS 6.9)"
                        }, {
                            text: "Китайский (владею свободно: HSK5)"
                        }]
                    },
                    courses: {
                        title: "Курсы",
                        description: "Люблю учиться. Платно и бес-",
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
                        title: "Стэк технологий",
                        description: "Пишу на этом",
                        data: ["HTML5", "CSS3", "JS (ES5, ES6)", "Vue.js", "LESS", "SCSS", "Pug"]
                    },
                    graphicSoftware: {
                        title: "Владение графическими ПО",
                        description: "Могу достать иконку и шрифты, только если макет не был прислан в формате *.docx",
                        data: ["Photoshop", "Sketch", "Figma", "Illustrator"]
                    },
                    coreSkills: {
                        title: "Профильные навыки",
                        description: "Пользуюсь этим на работе",
                        data: [{
                            text: "Адаптивная верстка"
                        }, {
                            text: "Кроссбраузерная верстка"
                        }, {
                            text: "Знаю основы UI/UX"
                        }]
                    },
                    nonCoreSkills: {
                        title: "Непрофильные навыки",
                        description: "Пользуюсь этим в жизни",
                        data: [{
                            text: "Чувство прекрасного"
                        }, {
                            text: "Умеренный перфекционизм"
                        }]
                    },
                    extra: {
                        title: "Дополнительно о себе",
                        description: "Чем еще могу похвастаться",
                         data: [{
                            text: "Проживание и обучение в Китае (2017 - 2018)"
                         }, {
                             text: "Преподавание английского в Китае и России"
                         }, {
                             text: "Дистанционное преподавание английского китайцам (2017 – настоящее время)"
                         }]
                    },
                    about: {
                        title: "О себе",
                        data: "Задача организации, в особенности же постоянный количественный рост и сфера нашей активности позволяет оценить значение новых предложений. Повседневная практика показывает, что дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание форм развития. Задача организации, в особенности же постоянный количественный рост и сфера нашей активности играет важную роль в формировании систем массового участия.\n" +
                            "\n" +
                            "Не следует, однако забывать, что дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке модели развития. Идейные соображения высшего порядка, а также сложившаяся структура организации позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач. Товарищи! сложившаяся структура организации позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности позволяет оценить значение направлений прогрессивного развития. Значимость этих проблем настолько очевидна, что новая модель организационной деятельности играет важную роль в формировании новых предложений. Равным образом новая модель организационной деятельности требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям."
                    }
                }
            }
        },
        methods: {
            getItemType(item) {
                if (!Array.isArray(item)) {
                    return 'text';
                } else if (item && !Array.isArray(item) && typeof item === 'object') {
                    return 'object';
                } else {
                    return 'array';
                }
            },
            pickAppropriateList(item) {

                    for (let i = 0; i < item.data.length; i++) {
                        if (typeof item.data[i] === 'string') {
                            // Используем cell-list
                            return "cell";
                        } else {
                            for (let key in item.data) {
                                if (Object.keys(item.data[key]).length > 1) {
                                    return "with-buttons";
                                } else {
                                    return "ordinary";
                                }
                            }
                        }
                    };
            }
        }
    }
</script>

<style lang="scss" scoped>

    #cv {
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

    .cv-content-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0 15px;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-around;
        }

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            display: block;
        }
    }

    .cv-item-wrapper {
        padding-bottom: 20px;
        @include border-radius(10px);
        margin-bottom: 20px;
        background-color: #ffffff;
        @include box-shadow(
                        0 11px 15px -7px rgba(0,0,0,0.2),
                        0 24px 38px 3px rgba(0,0,0,0.14),
                        0 9px 46px 8px rgba(0,0,0,0.12)
        );

        &:nth-last-child(1) {
            @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
                flex-basis: 100%;
            }

            @media only screen and (min-width: map-deep-get($devices, 'desktop')) {
                width: 100%
            }
        }


        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            flex-basis: 47%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'desktop')) {
            float: left;
            width: 33%;
            margin-right: 3px;
            margin-bottom: 10px;
        }

    }

    .cv-item-title {
        @include reset-pad-marg();
        padding: 0 10px;
        margin-top: 10px;
        margin-bottom: 15px;
        text-align: center;
        font-size: 1.8em;
        color: $cv-item-text-color;
    }

    .cv-item-description {
        @include reset-pad-marg();
        padding: 0 10px;
        margin-bottom: 20px;
        font-size: 1.1em;
        text-align: center;
        color: $cv-item-text-color;
    }

    .cv-item-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>