<template lang="pug">
    div#cv
        h2.block-title Резюме
        p.block-description А это резюме. Да
        div.cv-content-wrapper
            CVItemWrapper(
                v-for="(item, key, index) in cvData"
                :info="item"
                :number="index"
                :key="key"
                @mount-finished="positionChildren($event)"
            )
                <!--h3.cv-item-title {{ item.title }}-->
                <!--p.cv-item-description {{ item.description }}-->
                <!--template(v-if="getItemType(item.data) === 'text'")-->
                    <!--TextField(:data="item.data" :state="'light'")-->
                //template(v-else)
                    CellList(v-if="pickAppropriateList(item) === 'cell'" :data="item.data")
                    ListWithButtons(v-else-if="pickAppropriateList(item) === 'with-buttons'" :data="item.data")
                    OrdinaryList(v-else :data="item.data")

</template>

<script>

    import Vue from 'vue';
    import CVItemWrapper from './item-wrapper/index.vue';
    // import CellList from './items/cell-list/index.vue';
    // import ListWithButtons from './items/list-with-links/index.vue';
    // import OrdinaryList from './items/ordinary-list/index.vue';
    // import TextField from './items/text-field/index.vue';

    function positionChildrenDecorator() {
        let positionChildrenMap = [],
            //index = 0,
            childNumInMap = 0,
            index = 0;

        if (window.outerWidth >= 620 && window.outerWidth < 1024) {
            positionChildrenMap.length = 2;
        } else if (window.outerWidth >= 1024) {
            positionChildrenMap.length = 3;
        }

        for (let i = 0; i <= positionChildrenMap.length - 1; i++) {
            positionChildrenMap[i] = {x: 0, y: 0};
        }

        function getPrevCellValue(currentIndex) {
            if (currentIndex === 0) {
                return positionChildrenMap[positionChildrenMap.length - 1];
            } else {
                return positionChildrenMap[currentIndex - 1];
            }
        }

        function isInt(n){
            return Number(n) === n && n % 1 === 0;
        }

        return function(args) {
            let {element} = args,
                prevCellValue,
                width = element.clientWidth,
                height = element.clientHeight;

            if (childNumInMap > positionChildrenMap.length - 1) {
                childNumInMap = 0;
                positionChildrenMap.forEach((item) => {
                    item.x = 0;
                })
            }

            // prevCellValue = getPrevCellValue(childNumInMap);
            element.style.position = 'absolute';
            element.style.top = '0';
            element.style.left = '0';

            if (index === 0) {
                element.style.transform = `translateX(0) translateY(0)`;
                positionChildrenMap[childNumInMap].x = width + 10;
                positionChildrenMap[childNumInMap].y = height + 10;
            } else if (index <= positionChildrenMap.length - 1) {
                // Тут при позиционировании смотрит только на значение x у предыдущего элемента
                element.style.transform = `translateX(${positionChildrenMap[childNumInMap - 1].x}px) translateY(0)`;
                positionChildrenMap[childNumInMap].x = positionChildrenMap[childNumInMap - 1].x + width + 10;
                positionChildrenMap[childNumInMap].y = height + 10;
            } else {
                let transformHoriz = (childNumInMap === 0) ? 0 : positionChildrenMap[childNumInMap - 1].x;
                // Тут при позиционировании смотрит на значение у предыдущего элемента
                element.style.transform = `translateX(${transformHoriz}px) translateY(${positionChildrenMap[childNumInMap].y}px)`;
                positionChildrenMap[childNumInMap].x = transformHoriz + width + 7;
                positionChildrenMap[childNumInMap].y = positionChildrenMap[childNumInMap].y + height + 10;

            }

            // positionChildrenMap[childNumInMap].x = positionChildrenMap[childNumInMap - 1] + width + 7;
            // positionChildrenMap[childNumInMap].y = height + 7;

            // if (positionChildrenMap.length === 2) {
            //     positionChildrenMap[childNumInMap].x = prevCellValue.x + width + 7;
            //     positionChildrenMap[childNumInMap].y = prevCellValue.y + height + 7;
            // } else {
            //     positionChildrenMap[childNumInMap].x = (childNumInMap !== 0 && isInt(childNumInMap / positionChildrenMap.length - 1)) ? 0 : prevCellValue.x + width + 7;
            //     positionChildrenMap[childNumInMap].y = (index <= positionChildrenMap.length - 1) ? 0 : prevCellValue.y + height + 7;
            // }
            // positionChildrenMap[childNumInMap].x = prevCellValue.x + width;
            // positionChildrenMap[childNumInMap].y = prevCellValue.y + height;

            childNumInMap++;
            index++;

            // if (childNumInMap === 0) {
            //     element.setAttribute('style', `transform: translateX(0), translateY(0)`);
            // } else {
            //     element.setAttribute('style', `transform: translateX(${positionChildrenMap[childNumInMap].x}px), translateY(${positionChildrenMap[childNumInMap].y}px)`);
            // }
        }
    }


    export default {
        components: {
            // CellList,
            // ListWithButtons,
            // OrdinaryList,
            // TextField
            CVItemWrapper
        },
        data() {
            return {
                childrenPositionMap: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
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
        beforeMount() {
            this.positionChildren = positionChildrenDecorator();
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
            positionChildren() {}
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
        max-width: 1024px;
        padding: 0 15px;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-around;
        }

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: relative;
            display: block;
        }
    }

    // ТУТ БЫЛИ СТИЛИ ДЛЯ ВРАППЕРА КОНТЕНТА
</style>