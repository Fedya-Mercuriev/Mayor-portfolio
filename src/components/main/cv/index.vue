<template lang="pug">
    section#cv
        h2.block-title Резюме
        p.block-description А это резюме. Да
        ContentWrapper(:data="cvData" :appearance="appearance")


</template>

<script>
    // import Vue from 'vue';
    // import CVItemWrapper from './item-wrapper/contacts.vue';
    import ContentWrapper from './content-wrapper/content-wrapper.vue';

    // function buildCvItemsSection(containerWidth) {
    //     // let positionChildrenMap = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
    //     //     childrenInstances = [],
    //     //     childNumInMap = 0,
    //     //     index = 0,
    //     //     Xgap = 10,
    //     //     Ygap = 30;
    //     let positioningConfig = this.getPositioningConfig(containerWidth);
    //
    //     if (this.defineIfHasItems()) {
    //         // this.positionChildrenMap = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
    //         this.index = 0;
    //         this.childNumInMap = 0;
    //         this.defineIfNeedsGrid()
    //             .then(result => {
    //                 if (result) {
    //                     this.positionChildrenMap = this.makePositionMap(positioningConfig.rowLength);
    //                     this.positionItems(positioningConfig)
    //                 } else {
    //                     this.clearItemsStyles();
    //                 }
    //             });
    //     } else {
    //         this.placeItems()
    //             .then(() => {
    //                 return this.defineIfNeedsGrid();
    //             })
    //             .then(result => {
    //                 if (result) {
    //                     let width = result;
    //                     this.positionChildrenMap = this.makePositionMap(positioningConfig.rowLength);
    //                     // таймаут нужен для того, чтоб отрисовались шрифты и рассчиталась реальная высота
    //                     this.childrenInstances.forEach(item => {
    //                         item.$forceUpdate();
    //                     });
    //                     setTimeout(this.positionItems.bind(this, positioningConfig), 800);
    //                     // this.positionItems(positioningConfig);
    //                 } else {
    //                     this.clearItemsStyles();
    //                 }
    //             })
    //     }
    // }

    // function debounce(func, wait, immediate) {
    //     var timeout;
    //
    //     // This is the function that is actually executed when
    //     // the DOM event is triggered.
    //     return function executedFunction() {
    //         // Store the context of this and any
    //         // parameters passed to executedFunction
    //         var context = this;
    //         var args = arguments;
    //
    //         // The function to be called after
    //         // the debounce time has elapsed
    //         var later = function() {
    //             // null timeout to indicate the debounce ended
    //             timeout = null;
    //
    //             // Call function now if you did not on the leading end
    //             if (!immediate) func.apply(context, args);
    //         };
    //
    //         // Determine if you should call the function
    //         // on the leading or trail end
    //         var callNow = immediate && !timeout;
    //
    //         // This will reset the waiting every function execution.
    //         // This is the step that prevents the function from
    //         // being executed because it will never reach the
    //         // inside of the previous setTimeout
    //         clearTimeout(timeout);
    //
    //         // Restart the debounce waiting period.
    //         // setTimeout returns a truthy value (it differs in web vs node)
    //         timeout = setTimeout(later, wait);
    //
    //         // Call immediately if you're dong a leading
    //         // end execution
    //         if (callNow) func.apply(context, args);
    //     };
    // };

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
            // CVItemWrapper
            ContentWrapper
        },
        props: {
            appearance: String
        },
        data() {
            return {
                // positionChildrenMap: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
                // positionChildrenMap: [],
                // childrenInstances: [],
                // childNumInMap: 0,
                // index: 0,
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
        // mounted() {
        //     let ctx = this,
        //         buildCvItems = debounce(buildCvItemsSection, 300),
        //         containerWidth = this.$refs.cvItemsContainer.clientWidth;
        //
        //     buildCvItems = buildCvItems.bind(this);
        //
        //     this.$nextTick(function() {
        //         window.addEventListener('resize', function() {
        //             containerWidth = ctx.$refs.cvItemsContainer.clientWidth;
        //             buildCvItems(containerWidth);
        //         });
        //             // buildCvItems(containerWidth);
        //     });
        //     buildCvItems(containerWidth);
        //     // if (this.childrenInstances.length === 0) {
        //     //     let ItemWrapperComponent = Vue.extend(CVItemWrapper),
        //     //         updatedCoordinates;
        //     //     for (let item in this.cvData) {
        //     //         let itemWrapper = new ItemWrapperComponent({
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
        // },
        // methods: {
        //     getItemType(item) {
        //         if (!Array.isArray(item)) {
        //             return 'text';
        //         } else if (item && !Array.isArray(item) && typeof item === 'object') {
        //             return 'object';
        //         } else {
        //             return 'array';
        //         }
        //     },
        //     defineIfHasItems() {
        //         return (this.childrenInstances.length !== 0);
        //         // if (this.childrenInstances.length === 0) {
        //         //     return false;
        //         // }
        //         // return true;
        //     },
        //     defineIfNeedsGrid() {
        //         return new Promise(resolve => {
        //             let width = window.outerWidth;
        //             if (width >= 768) {
        //                 // Данный результат затем будет передан другой функции, которая исходя из
        //                 // результата решит нужно ли позиционировать элементы резюме
        //                 resolve(true);
        //             } else {
        //                 resolve(false);
        //             }
        //         });
        //     },
        //     makePositionMap(length) {
        //         let result = [];
        //         for (let i = 0; i < length; i++) {
        //             result.push({x: 0, y: 0});
        //         }
        //         return result;
        //     },
        //     getPositioningConfig(containerWidth) {
        //         let result = {itemWidth: 0, rowLength: 0};
        //         result.rowLength = (containerWidth < 1024) ? 2 : 3;
        //         result.itemWidth = containerWidth / result.rowLength;
        //         // result.Xgap = (containerWidth - (result.itemWidth * result.rowLength)) / result.rowLength - 1;
        //         return result;
        //     },
        //     placeItems() {
        //         return new Promise(resolve => {
        //             let itemWrapperComponent = Vue.extend(CVItemWrapper);
        //             for (let item in this.cvData) {
        //                 let itemWrapper = new itemWrapperComponent({
        //                     propsData: {
        //                         info: this.cvData[item]
        //                     }
        //                 });
        //                 itemWrapper.$mount();
        //                 this.$refs.cvItemsContainer.appendChild(itemWrapper.$el);
        //                 this.childrenInstances.push(itemWrapper);
        //             }
        //             resolve(true);
        //         });
        //     },
        //     positionItems(config) {
        //         // config содердит ширину карточки, расстояние между ними и длину ряда
        //         let updatedCoordinates;
        //         // if (this.childrenInstances.length === 0) {
        //         //     for (let item in this.cvData) {
        //         //         let itemWrapper = new itemWrapperComponent({
        //         //             propsData: {
        //         //                 info: this.cvData[item]
        //         //             }
        //         //         });
        //         //         itemWrapper.$mount();
        //         //         this.$refs.cvItemsContainer.appendChild(itemWrapper.$el);
        //         //         this.childrenInstances.push(itemWrapper);
        //         //         updatedCoordinates = itemWrapper.positionSelf(this.getPositionCoordinates());
        //         //         this.positionChildrenMap[this.childNumInMap].x = updatedCoordinates.hor;
        //         //         this.positionChildrenMap[this.childNumInMap].y = updatedCoordinates.ver;
        //         //         this.incrementSection();
        //         //     }
        //         // }
        //         this.childrenInstances.forEach(item => {
        //             updatedCoordinates = item.positionSelf(this.getPositionCoordinates(), config.itemWidth);
        //             this.positionChildrenMap[this.childNumInMap].x = updatedCoordinates.hor;
        //             this.positionChildrenMap[this.childNumInMap].y = updatedCoordinates.ver;
        //             this.incrementSection();
        //         })
        //     },
        //     getPositionCoordinates() {
        //         // let Xgap = 10,
        //         //     Ygap = 30;
        //         if (this.childNumInMap > this.positionChildrenMap.length - 1) {
        //             this.childNumInMap = 0;
        //             this.positionChildrenMap.forEach((item) => {
        //                 item.x = 0;
        //             })
        //         }
        //         if (this.index === 0) {
        //             // this.positionChildrenMap[this.childNumInMap].x = width + Xgap;
        //             // this.positionChildrenMap[this.childNumInMap].y = height + Ygap;
        //             return {hor: 0, ver: 0, CSSPosition: 'absolute'};
        //
        //         } else if (this.index <= this.positionChildrenMap.length - 1) {
        //             let transformHoriz = this.positionChildrenMap[this.childNumInMap - 1].x,
        //                 width = this.positionChildrenMap[0].x;
        //
        //             if (this.index === this.positionChildrenMap.length - 1) {
        //                 width = width * this.positionChildrenMap.length;
        //                 console.log(width);
        //             }
        //             // Тут при позиционировании смотрит только на значение x у предыдущего элемента
        //             // this.positionChildrenMap[this.childNumInMap].x = this.positionChildrenMap[this.childNumInMap - 1].x + width + Xgap;
        //             // this.positionChildrenMap[this.childNumInMap].y = height + Ygap;
        //             return {hor: transformHoriz, ver: 0, CSSPosition: 'absolute'}
        //
        //         } else if (this.index === Object.keys(this.cvData).length - 1) {
        //             let transformVert = this.positionChildrenMap[this.childNumInMap].y;
        //             return {hor: 0, ver: transformVert, CSSPosition: 'static'}
        //
        //         } else {
        //             let transformHoriz = (this.childNumInMap === 0) ? 0 : this.positionChildrenMap[this.childNumInMap - 1].x,
        //                 transformVert = this.positionChildrenMap[this.childNumInMap].y;
        //             // Тут при позиционировании смотрит на значение у предыдущего элемента
        //             // this.positionChildrenMap[this.childNumInMap].x = transformHoriz + width + Xgap;
        //             // this.positionChildrenMap[this.childNumInMap].y = this.positionChildrenMap[this.childNumInMap].y + height + Ygap;
        //             return {hor: transformHoriz, ver: transformVert, CSSPosition: 'absolute'};
        //         }
        //     },
        //     incrementSection() {
        //         this.childNumInMap++;
        //         this.index++;
        //     },
        //     clearItemsStyles() {
        //         this.childrenInstances.forEach(item => {
        //             item.removeCustomStyles();
        //         });
        //     }
        // }
    }
</script>

<style lang="scss" scoped>

    #cv {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>