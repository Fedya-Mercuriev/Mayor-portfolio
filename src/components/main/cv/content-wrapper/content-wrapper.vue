<template lang="pug">
    div.cv-content-wrapper(ref="cvItemsContainer")
</template>

<script>
    import Vue from 'vue';
    // import CVItemWrapper from './../item-wrapper/portfolio.vue';
    import NoMediaCard from 'Components/public/cards/no-media-card.vue';

    function buildCvItemsSection(containerWidth) {
        // let positionChildrenMap = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        //     childrenInstances = [],
        //     childNumInMap = 0,
        //     index = 0,
        //     Xgap = 10,
        //     Ygap = 30;
        let positioningConfig = this.getPositioningConfig(containerWidth);

        if (this.defineIfHasItems()) {
            // this.positionChildrenMap = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
            this.index = 0;
            this.childNumInMap = 0;
            this.defineIfNeedsGrid()
                .then(result => {
                    if (result) {
                        this.positionChildrenMap = this.makePositionMap(positioningConfig.rowLength);
                        this.positionItems(positioningConfig)
                    } else {
                        this.clearItemsStyles();
                    }
                });
        } else {
            this.placeItems()
                .then(() => {
                    return this.defineIfNeedsGrid();
                })
                .then(result => {
                    if (result) {
                        let width = result;
                        this.positionChildrenMap = this.makePositionMap(positioningConfig.rowLength);
                        // таймаут нужен для того, чтоб отрисовались шрифты и рассчиталась реальная высота
                        this.childrenInstances.forEach(item => {
                            item.$forceUpdate();
                        });
                        setTimeout(this.positionItems.bind(this, positioningConfig), 800);
                        // this.positionItems(positioningConfig);
                    } else {
                        this.clearItemsStyles();
                    }
                })
        }
    }

    function debounce(func, wait, immediate) {
        var timeout;

        // This is the function that is actually executed when
        // the DOM event is triggered.
        return function executedFunction() {
            // Store the context of this and any
            // parameters passed to executedFunction
            var context = this;
            var args = arguments;

            // The function to be called after
            // the debounce time has elapsed
            var later = function() {
                // null timeout to indicate the debounce ended
                timeout = null;

                // Call function now if you did not on the leading end
                if (!immediate) func.apply(context, args);
            };

            // Determine if you should call the function
            // on the leading or trail end
            var callNow = immediate && !timeout;

            // This will reset the waiting every function execution.
            // This is the step that prevents the function from
            // being executed because it will never reach the
            // inside of the previous setTimeout
            clearTimeout(timeout);

            // Restart the debounce waiting period.
            // setTimeout returns a truthy value (it differs in web vs node)
            timeout = setTimeout(later, wait);

            // Call immediately if you're dong a leading
            // end execution
            if (callNow) func.apply(context, args);
        };
    };

    export default {
        props: {
            appearance: String,
            data: {
                type: 'Object',
                required: true
            }
        },
        data() {
            return {
                positionChildrenMap: [],
                childrenInstances: [],
                childNumInMap: 0,
                index: 0
            }
        },
        mounted() {
            let ctx = this,
                buildCvItems = debounce(buildCvItemsSection, 300),
                containerWidth = this.$refs.cvItemsContainer.clientWidth;

            buildCvItems = buildCvItems.bind(this);

            this.$nextTick(function() {
                window.addEventListener('resize', function() {
                    containerWidth = ctx.$refs.cvItemsContainer.clientWidth;
                    buildCvItems(containerWidth);
                });
            });
            buildCvItems(containerWidth);
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
                        resolve(true);
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
            getPositioningConfig(containerWidth) {
                let result = {itemWidth: 0, rowLength: 0};
                result.rowLength = (containerWidth < 1024) ? 2 : 3;
                result.itemWidth = containerWidth / result.rowLength;
                // result.Xgap = (containerWidth - (result.itemWidth * result.rowLength)) / result.rowLength - 1;
                return result;
            },
            placeItems() {
                return new Promise(resolve => {
                    let CardComponent = Vue.extend(NoMediaCard);
                    for (let item in this.data) {
                        // Создадаим обертку для компонента
                        let componentWrapper = document.createElement('div');
                        // Добавим ему класс
                        componentWrapper.classList.add('card-container');
                        this.$el.appendChild(componentWrapper);
                        let card = new CardComponent({
                            propsData: {
                                cardData: this.data[item],
                                appearance: this.appearance
                            }
                            // Еще сюда нужно поместить подходящий тип списка
                        });
                        card.$mount();
                        componentWrapper.appendChild(card.$el);
                        this.childrenInstances.push(card);
                    }
                    resolve(true);
                });
            },
            positionItems(config) {
                // config содердит ширину карточки, расстояние между ними и длину ряда
                let updatedCoordinates;
                this.childrenInstances.forEach(item => {
                    updatedCoordinates = item.positionSelf(this.getPositionCoordinates(), config.itemWidth);
                    this.positionChildrenMap[this.childNumInMap].x = updatedCoordinates.hor;
                    this.positionChildrenMap[this.childNumInMap].y = updatedCoordinates.ver;
                    this.incrementSection();
                })
            },
            getPositionCoordinates() {
                // let Xgap = 10,
                //     Ygap = 30;
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
                    let transformHoriz = this.positionChildrenMap[this.childNumInMap - 1].x,
                        width = this.positionChildrenMap[0].x;

                    if (this.index === this.positionChildrenMap.length - 1) {
                        width = width * this.positionChildrenMap.length;
                        console.log(width);
                    }
                    // Тут при позиционировании смотрит только на значение x у предыдущего элемента
                    // this.positionChildrenMap[this.childNumInMap].x = this.positionChildrenMap[this.childNumInMap - 1].x + width + Xgap;
                    // this.positionChildrenMap[this.childNumInMap].y = height + Ygap;
                    return {hor: transformHoriz, ver: 0, CSSPosition: 'absolute'}

                } else if (this.index === Object.keys(this.data).length - 1) {
                    let transformVert = this.positionChildrenMap[this.childNumInMap].y;
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

<style lang="scss">
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
            padding: 0;
        }

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            position: relative;
            display: block;
            padding: 0;
        }

        @media only screen and (min-width: map-deep-get($devices, 'desktop')) {
            width: 1024px;
        }
    }

    .card-container {
        position: relative;
        padding: 0 5px;
        margin-bottom: 35px;
        @include transition(transform);

        &:nth-last-child(1) {
            @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
                flex-basis: 100%;

            }

            @media only screen and (min-width: map-deep-get($devices, 'desktop')) {
                /*width: 100%*/
            }
        }

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            box-sizing: border-box;
            width: 47%;
            padding: 0;
            margin-bottom: 0;
            /*flex-basis: 47%;*/
        }

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            /*float: left;*/
            width: 33%;
            /*padding: 0 7px 15px 7px;*/
            /*margin-right: 3px;*/
            margin-bottom: 0;
        }
    }
</style>