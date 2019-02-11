<template lang="pug">
    div#cv
        h2.block-title Резюме
        p.block-description А это резюме. Да
        div.cv-content-wrapper(ref="cvItemsContainer")


</template>

<script>

    import Vue from 'vue';
    import CVItemWrapper from './item-wrapper/index.vue';

    function buildCvItemsSection() {
        // let positionChildrenMap = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        //     childrenInstances = [],
        //     childNumInMap = 0,
        //     index = 0,
        //     Xgap = 10,
        //     Ygap = 30;

        if (this.defineIfHasItems()) {
            // this.positionChildrenMap = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
            this.index = 0;
            this.childNumInMap = 0;
            this.defineIfNeedsGrid()
                .then(result => {
                    if (result) {
                        let width = result;
                        this.positionChildrenMap = (width === 768) ? this.makePositionMap(2) : this.makePositionMap(3);
                        this.positionItems()
                    } else {
                        this.clearItemsStyles();
                    }
                });
        } else {
            this.placeItems();
            this.defineIfNeedsGrid()
                .then(result => {
                    if (result) {
                        let width = result;
                        this.positionChildrenMap = (width === 768) ? this.makePositionMap(2) : this.makePositionMap(3);
                        this.positionItems();
                    } else {
                        this.clearItemsStyles();
                    }
                })
        }
    }

    // function defineIfHasItems(children) {
    //     return (children.length !== 0);
    // }
    //
    // function defineIfNeedsGrid() {
    //     return new Promise(resolve => {
    //         let width = window.outerWidth;
    //
    //         if (width >= 768) {
    //             // Данный результат затем будет передан другой функции, которая исходя из
    //             // результата решит нужно ли позиционировать элементы резюме
    //             resolve(true);
    //         } else {
    //             resolve(false);
    //         }
    //     });
    // }
    //
    // function placeItems() {
    //     let itemWrapperComponent = Vue.extend(CVItemWrapper),
    //         children = [];
    //
    //     for (let item in this.cvData) {
    //         let itemWrapper = new itemWrapperComponent({
    //             propsData: {
    //                 info: this.cvData[item]
    //             }
    //         });
    //         itemWrapper.$mount();
    //         this.$refs.cvItemsContainer.appendChild(itemWrapper.$el);
    //         children.push(itemWrapper);
    //         return children;
    //     }
    // }
    //
    // function positionItems(children) {
    //     let updatedCoordinates;
    //
    //     // if (this.childrenInstances.length === 0) {
    //     //     for (let item in this.cvData) {
    //     //         let itemWrapper = new itemWrapperComponent({
    //     //             propsData: {
    //     //                 info: this.cvData[item]
    //     //             }
    //     //         });
    //     //         itemWrapper.$mount();
    //     //         this.$refs.cvItemsContainer.appendChild(itemWrapper.$el);
    //     //         this.childrenInstances.push(itemWrapper);
    //     //         updatedCoordinates = itemWrapper.positionSelf(this.getPositionCoordinates());
    //     //         this.positionChildrenMap[this.childNumInMap].x = updatedCoordinates.hor;
    //     //         this.positionChildrenMap[this.childNumInMap].y = updatedCoordinates.ver;
    //     //         this.incrementSection();
    //     //     }
    //     // }
    //
    //     // Children = children instances array
    //     children.forEach((item) => {
    //         updatedCoordinates = item.positionSelf(getPositionCoordinates(), {Xgap: this.Xgap, Ygap: this.Ygap});
    //         positionChildrenMap[childNumInMap].x = updatedCoordinates.hor;
    //         positionChildrenMap[childNumInMap].y = updatedCoordinates.ver;
    //         this.incrementSection();
    //     });
    //
    //     // Аннулируем значения по завершению работы
    //     if (index === this.length - 1) {
    //         this.forEach(item => {
    //             item.x = 0;
    //             item.y = 0;
    //         });
    //         index = 0;
    //         childNumInMap = 0;
    //     }
    // }
    //
    // function getPositionCoordinates() {
    //
    //     if (childNumInMap > positionChildrenMap.length - 1) {
    //         childNumInMap = 0;
    //         positionChildrenMap.forEach((item) => {
    //             item.x = 0;
    //         })
    //     }
    //
    //     if (index === 0) {
    //         // this.positionChildrenMap[this.childNumInMap].x = width + Xgap;
    //         // this.positionChildrenMap[this.childNumInMap].y = height + Ygap;
    //         return {hor: 0, ver: 0, CSSPosition: 'absolute'};
    //
    //     } else if (index <= positionChildrenMap.length - 1) {
    //         let transformHoriz = positionChildrenMap[childNumInMap - 1].x;
    //         // Тут при позиционировании смотрит только на значение x у предыдущего элемента
    //         // this.positionChildrenMap[this.childNumInMap].x = this.positionChildrenMap[this.childNumInMap - 1].x + width + Xgap;
    //         // this.positionChildrenMap[this.childNumInMap].y = height + Ygap;
    //         return {hor: transformHoriz, ver: 0, CSSPosition: 'absolute'}
    //
    //     } else if (this.index === Object.keys(this.cvData).length - 1) {
    //         let transformVert = this.positionChildrenMap[this.childNumInMap].y + this.Ygap;
    //         return {hor: 0, ver: transformVert, CSSPosition: 'static'}
    //
    //     } else {
    //         let transformHoriz = (this.childNumInMap === 0) ? 0 : this.positionChildrenMap[this.childNumInMap - 1].x,
    //             transformVert = this.positionChildrenMap[this.childNumInMap].y;
    //         // Тут при позиционировании смотрит на значение у предыдущего элемента
    //         // this.positionChildrenMap[this.childNumInMap].x = transformHoriz + width + Xgap;
    //         // this.positionChildrenMap[this.childNumInMap].y = this.positionChildrenMap[this.childNumInMap].y + height + Ygap;
    //         return {hor: transformHoriz, ver: transformVert, CSSPosition: 'absolute'};
    //     }
    // }

    export default {
        components: {
            CVItemWrapper
        },
        data() {
            return {
                // positionChildrenMap: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
                positionChildrenMap: [],
                childrenInstances: [],
                childNumInMap: 0,
                index: 0,
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
        mounted() {
            let ctx = this,
                buildCvItems = buildCvItemsSection.bind(ctx);
            this.$nextTick(function() {
                window.addEventListener('resize', function() {
                    buildCvItems();
                })
            });
            buildCvItems();
            // if (this.childrenInstances.length === 0) {
            //     let ItemWrapperComponent = Vue.extend(CVItemWrapper),
            //         updatedCoordinates;
            //     for (let item in this.cvData) {
            //         let itemWrapper = new ItemWrapperComponent({
            //             propsData: {
            //                 info: this.cvData[item]
            //             }
            //         });
            //         itemWrapper.$mount();
            //         this.$refs.cvItemsContainer.appendChild(itemWrapper.$el);
            //         this.childrenInstances.push(itemWrapper);
            //         updatedCoordinates = itemWrapper.positionSelf(this.getPositionCoordinates());
            //         this.positionChildrenMap[this.childNumInMap].x = updatedCoordinates.hor;
            //         this.positionChildrenMap[this.childNumInMap].y = updatedCoordinates.ver;
            //         this.incrementSection();
            //     }
            // }
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
            defineIfHasItems() {
                return (this.childrenInstances.length !== 0);
                // if (this.childrenInstances.length === 0) {
                //     return false;
                // }
                // return true;
            },
            defineIfNeedsGrid() {
                return new Promise(resolve => {
                    let width = window.outerWidth;
                    if (width >= 768) {
                        // Данный результат затем будет передан другой функции, которая исходя из
                        // результата решит нужно ли позиционировать элементы резюме
                        resolve(width);
                    } else {
                        resolve(false);
                    }
                });
            },
            makePositionMap(length) {
                let result = [];
                for (let i = 0; i < length; i++) {
                    result.push({x: 0, y: 0});
                }
                return result;
            },
            placeItems() {
                let itemWrapperComponent = Vue.extend(CVItemWrapper);
                for (let item in this.cvData) {
                    let itemWrapper = new itemWrapperComponent({
                        propsData: {
                            info: this.cvData[item]
                        }
                    });
                    itemWrapper.$mount();
                    this.$refs.cvItemsContainer.appendChild(itemWrapper.$el);
                    this.childrenInstances.push(itemWrapper);
                }
            },
            positionItems() {
                let updatedCoordinates;
                // if (this.childrenInstances.length === 0) {
                //     for (let item in this.cvData) {
                //         let itemWrapper = new itemWrapperComponent({
                //             propsData: {
                //                 info: this.cvData[item]
                //             }
                //         });
                //         itemWrapper.$mount();
                //         this.$refs.cvItemsContainer.appendChild(itemWrapper.$el);
                //         this.childrenInstances.push(itemWrapper);
                //         updatedCoordinates = itemWrapper.positionSelf(this.getPositionCoordinates());
                //         this.positionChildrenMap[this.childNumInMap].x = updatedCoordinates.hor;
                //         this.positionChildrenMap[this.childNumInMap].y = updatedCoordinates.ver;
                //         this.incrementSection();
                //     }
                // }
                this.childrenInstances.forEach(item => {
                    updatedCoordinates = item.positionSelf(this.getPositionCoordinates());
                    this.positionChildrenMap[this.childNumInMap].x = updatedCoordinates.hor;
                    this.positionChildrenMap[this.childNumInMap].y = updatedCoordinates.ver;
                    this.incrementSection();
                })
            },
            getPositionCoordinates() {
                let Xgap = 10,
                    Ygap = 30;
                if (this.childNumInMap > this.positionChildrenMap.length - 1) {
                    this.childNumInMap = 0;
                    this.positionChildrenMap.forEach((item) => {
                        item.x = 0;
                    })
                }
                if (this.index === 0) {
                    // this.positionChildrenMap[this.childNumInMap].x = width + Xgap;
                    // this.positionChildrenMap[this.childNumInMap].y = height + Ygap;
                    return {hor: 0, ver: 0, CSSPosition: 'absolute'};

                } else if (this.index <= this.positionChildrenMap.length - 1) {
                    let transformHoriz = this.positionChildrenMap[this.childNumInMap - 1].x;
                    // Тут при позиционировании смотрит только на значение x у предыдущего элемента
                    // this.positionChildrenMap[this.childNumInMap].x = this.positionChildrenMap[this.childNumInMap - 1].x + width + Xgap;
                    // this.positionChildrenMap[this.childNumInMap].y = height + Ygap;
                    return {hor: transformHoriz, ver: 0, CSSPosition: 'absolute'}

                } else if (this.index === Object.keys(this.cvData).length - 1) {
                    let transformVert = this.positionChildrenMap[this.childNumInMap].y + Ygap;
                    return {hor: 0, ver: transformVert, CSSPosition: 'static'}

                } else {
                    let transformHoriz = (this.childNumInMap === 0) ? 0 : this.positionChildrenMap[this.childNumInMap - 1].x,
                        transformVert = this.positionChildrenMap[this.childNumInMap].y;
                    // Тут при позиционировании смотрит на значение у предыдущего элемента
                    // this.positionChildrenMap[this.childNumInMap].x = transformHoriz + width + Xgap;
                    // this.positionChildrenMap[this.childNumInMap].y = this.positionChildrenMap[this.childNumInMap].y + height + Ygap;
                    return {hor: transformHoriz, ver: transformVert, CSSPosition: 'absolute'};
                }
            },
            incrementSection() {
                this.childNumInMap++;
                this.index++;
            },
            clearItemsStyles() {
                this.childrenInstances.forEach(item => {
                    item.removeCustomStyles();
                });
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
        max-width: 1024px;
        padding: 0 15px;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            position: relative;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: space-around;
            width: 90%;
        }

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: relative;
            display: block;
            padding: 0 5px;
        }

        @media only screen and (min-width: map-deep-get($devices, 'desktop')) {
            width: 1024px;
        }
    }

    // ТУТ БЫЛИ СТИЛИ ДЛЯ ВРАППЕРА КОНТЕНТА
</style>