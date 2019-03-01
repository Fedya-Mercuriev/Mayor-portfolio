<template lang="pug">
    div.cv-content-wrapper(ref="cvItemsContainer")
        template(v-for="cvItem in data")
            // Формируем список с плитками
            template(v-if="getItemType(cvItem.data) === 'array' && getItemType(cvItem.data[0]) === 'text'")
                div.card-container
                    NoMediaCard(:cardData="wrapTextData(cvItem)" :appearance="appearance")
                        CellList(:data="cvItem.data")

            // Формируем список с ссылками
            template(v-else-if="getItemType(cvItem.data[0]) === 'object' && cvItem.data[0].hasOwnProperty('hasCertificate')")
                div.card-container
                    NoMediaCard(:cardData="wrapTextData(cvItem)" :appearance="appearance")
                        ListWithButtons(:data="cvItem.data" :appearance="appearance")
                            PhotoIcon

            // Формируем обычный список
            template(v-else-if="getItemType(cvItem.data) === 'array' && getItemType(cvItem.data[0]) === 'object'")
                div.card-container
                    NoMediaCard(:cardData="wrapTextData(cvItem)" :appearance="appearance")
                        List(:data="cvItem.data" :appearance="appearance")
</template>

<script>
    import Vue from 'vue';
    import H3 from 'Components/public/text-components/titles/level-3.vue';
    import Paragraph from 'Components/public/text-components/paragraph.vue';
    import NoMediaCard from 'Components/public/cards/no-media-card.vue';
    import CellList from 'Components/public/lists/cell-list.vue';
    import ListWithButtons from 'Components/public/lists/list-with-buttons.vue';
    import List from 'Components/public/lists/ordinary-list.vue';
    import PhotoIcon from 'Root/svg/photo-icon.svg';
    import { EventBus } from 'Root/event-bus';

    function buildCvItemsSection(containerWidth) {
        let positioningConfig = this.getPositioningConfig(containerWidth),
            setHeight = setContainerHeight(this.$el);

        this.index = 0;
        this.childNumInMap = 0;

        this.defineIfNeedsGrid()
            .then(result => {
                if (result) {
                    let width = result;
                    this.positionChildrenMap = this.makePositionMap(positioningConfig.rowLength);
                    // таймаут нужен для того, чтоб отрисовались шрифты и рассчиталась реальная высота карточки
                    // this.childrenInstances.forEach(item => {
                    //     item.$forceUpdate();
                    // });
                    setTimeout(this.positionItems.bind(this, positioningConfig), 800);
                } else {
                    this.clearItemsStyles();
                }
            });

        // if (this.defineIfHasItems()) {
        //
        //     // Определим нужно ли выстраивать элементы в сетку (для паншетов и ПК)
        //     this.defineIfNeedsGrid()
        //         .then(result => {
        //             if (result) {
        //                 this.positionChildrenMap = this.makePositionMap(positioningConfig.rowLength);
        //                 this.positionItems(positioningConfig)
        //             } else {
        //                 this.clearItemsStyles();
        //             }
        //         });
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

    // Функция определит какого типа нужен список
    function getItemType(item) {
        if (!Array.isArray(item)) {
            return 'text';
        } else if (item && !Array.isArray(item) && typeof item === 'object') {
            return 'object';
        } else {
            return 'array';
        }
    }

    // Эта функция устанавливает высоту для контейнера с карточками,
    // так как карточки спозиционированы абсолютно, надо установить высоту вручную
    function setContainerHeight(container) {
        return function (positionMap) {
            let maxYValue = 0;
            // Проходимся в текущему ряду, находим максимальное значение y и устанавливаем его как высоту
            for (let item of positionMap) {
                if (item.y >= maxYValue) {
                    maxYValue = item.y;
                    container.style.height = `${maxYValue}px`;
                }
            }
        };
    }

    export default {
        components: {
            NoMediaCard,
            ListWithButtons,
            CellList,
            List,
            Paragraph,
            PhotoIcon
        },
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
                index: 0,
                containerWidth: 0,
                localisation: this.$root.$i18n.locale
            }
        },
        mounted() {
            let ctx = this,
                buildCvItems = debounce(buildCvItemsSection, 300);

            this.containerWidth = this.$refs.cvItemsContainer.clientWidth;

            this.buildCvItems = buildCvItems.bind(this);
            this.setHeight = setContainerHeight(this.$el);

            this.$nextTick(function() {
                window.addEventListener('resize', function() {
                    ctx.containerWidth = ctx.$refs.cvItemsContainer.clientWidth;
                    ctx.buildCvItems(ctx.containerWidth);
                });
            });

            this.buildCvItems(this.containerWidth);

            // При изменении языка сетка карточек будет пересобираться
            EventBus.$on('change-language', () => {
                this.buildCvItems(this.containerWidth);
            })
        },
        methods: {
            getItemType(item) {
                if (Array.isArray(item)) {
                    return 'array';
                } else if (item && !Array.isArray(item) && typeof item === 'object') {
                    return 'object';
                } else {
                    return 'text';
                }
            },

            wrapTextData(item) {
                let { title, description } = item;
                return {title: title, description: description};
            },

            buildCvItems: undefined,

            setHeight: undefined,

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
                return result;
            },
            // ЭТУ ФУНКЦИЯ ПО ХОДУ НЕ НУЖНА
            placeItems() {
                return new Promise(resolve => {
                    let CardComponent = Vue.extend(NoMediaCard),
                        listComponent,
                        componentData;
                    for (let item in this.data) {
                        componentData = this.data[item].data;

                        // Определим какой компонент вставить
                        if (getItemType(componentData) === 'text') {
                            // Если в текущем объекте текстовые данные, тогда просто создадим текстовый блок,
                            // а не карточку
                            let TitleConstructor = Vue.extend(H3),
                                ParagraphConstructor = Vue.extend(Paragraph),
                                textBlock = document.createElement('div');

                            textBlock.classList.add('text-block');
                            this.$parent.$el.appendChild(textBlock);

                            let blockTitle = new TitleConstructor({
                                    propsData: {
                                        appearance: this.appearance
                                    }
                            }),
                                blockText = new ParagraphConstructor({
                                    propsData: {
                                        appearance: this.appearance
                                    }
                                });

                            blockTitle.$slots.default = this.data[item].title;
                            blockText.$slots.default = this.data[item].data;

                            blockTitle.$mount();
                            blockText.$mount();

                            textBlock.appendChild(blockTitle.$el);
                            textBlock.appendChild(blockText.$el);

                        } else {
                            // Создадим обертку для карточки
                            let componentWrapper = document.createElement('div');
                            // Добавим ей класс
                            componentWrapper.classList.add('card-container');
                            this.$el.appendChild(componentWrapper);
                            let card = new CardComponent({
                                propsData: {
                                    cardData: this.data[item],
                                    appearance: this.appearance
                                }

                            });

                            let ComponentConstructor;
                            // Определим требуемый тип списка
                            ComponentConstructor = (typeof componentData[0] === 'object') ? ((componentData[0].hasOwnProperty('hasCertificate')) ? ListWithButtons : List) : CellList;
                            ComponentConstructor = Vue.extend(ComponentConstructor);
                            // Добавим данные в список
                            listComponent = new ComponentConstructor({
                                propsData: {
                                    data: componentData,
                                    appearance: this.appearance,
                                }
                            });

                            listComponent.$mount();
                            card.$mount();
                            // Подставим список в конец карточки
                            card.$refs['card-content'].appendChild(listComponent.$el);
                            componentWrapper.appendChild(card.$el);
                            this.childrenInstances.push(card);
                        }
                    }
                    resolve(true);
                });
            },

            positionItems(config) {
                // config содердит ширину карточки, расстояние между ними и длину ряда
                let updatedCoordinates,
                    cards = document.querySelectorAll('.card-container');
                cards.forEach((item, index) => {
                    updatedCoordinates = this.positionItem(index, this.getPositionCoordinates(), config.itemWidth, item);
                    this.positionChildrenMap[this.childNumInMap].x = updatedCoordinates.hor;
                    this.positionChildrenMap[this.childNumInMap].y = updatedCoordinates.ver;
                    if (index + 1 % this.positionChildrenMap.length > 0) {
                        this.setHeight(this.positionChildrenMap);
                    }
                    this.incrementSection();
                })
            },

            positionItem(itemNum, position, width, item) {
                let { hor, ver, CSSPosition } = position,
                    blockStyles = {
                        width: width,
                        height: item.clientHeight
                    };

                // Применим inline-стили к текущей карточке
                item.style.position = CSSPosition;
                item.style.top = 0;
                item.style.left = 0;
                item.style.transform = `translateX(${hor}px) translateY(${ver}px)`;

                return {
                    hor: hor + blockStyles.width,
                    ver: ver + blockStyles.height
                };
            },

            getPositionCoordinates() {
                if (this.childNumInMap > this.positionChildrenMap.length - 1) {
                    this.childNumInMap = 0;
                    this.positionChildrenMap.forEach((item) => {
                        item.x = 0;
                    })
                }
                if (this.index === 0) {
                    return {hor: 0, ver: 0, CSSPosition: 'absolute'};

                } else if (this.index <= this.positionChildrenMap.length - 1) {
                    let transformHoriz = this.positionChildrenMap[this.childNumInMap - 1].x,
                        width = this.positionChildrenMap[0].x;

                    if (this.index === this.positionChildrenMap.length - 1) {
                        width = width * this.positionChildrenMap.length;
                        console.log(width);
                    }
                    // Тут при позиционировании смотрит только на значение x у предыдущего элемента
                    return {hor: transformHoriz, ver: 0, CSSPosition: 'absolute'}

                } else if (this.index === Object.keys(this.data).length - 1) {
                    let transformVert = this.positionChildrenMap[this.childNumInMap].y;
                    return {hor: 0, ver: transformVert, CSSPosition: 'static'}

                } else {
                    let transformHoriz = (this.childNumInMap === 0) ? 0 : this.positionChildrenMap[this.childNumInMap - 1].x,
                        transformVert = this.positionChildrenMap[this.childNumInMap].y;
                    // Тут при позиционировании смотрит на значение у предыдущего элемента
                    return {hor: transformHoriz, ver: transformVert, CSSPosition: 'absolute'};
                }
            },

            incrementSection() {
                this.childNumInMap++;
                this.index++;
            },

            removeItemStyles(item) {
                item.style = "";
            },

            clearItemsStyles() {
                for (let item of this.$el.children) {
                    this.removeItemStyles(item);
                }
                this.$el.style = "";
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
            margin-bottom: 20px;
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
        }

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            box-sizing: border-box;
            width: 47%;
            padding: 0;
            margin-bottom: 0;
        }

        @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
            width: 33%;
            margin-bottom: 0;
        }
    }
</style>