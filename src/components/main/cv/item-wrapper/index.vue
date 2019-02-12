<template lang="pug">
    div.cv-item-container(v-bind:style="customStyles")
        div.cv-item-wrapper
            div.cv-item
                div.cv-item-body
                div.cv-item-content
                    h3.cv-item-title {{ info.title }}
                    p(v-if="info.description").cv-item-description {{ info.description }}
                    template(v-if="getItemType(info.data) === 'text'")
                        TextField(:data="info.data" :state="'light'")
                    template(v-else)
                        CellList(v-if="pickAppropriateList(info) === 'cell'" :data="info.data")
                        ListWithButtons(v-else-if="pickAppropriateList(info) === 'with-buttons'" :data="info.data")
                        OrdinaryList(v-else :data="info.data")
</template>

<script>
    import Vue from 'vue';
    import CellList from './../items/cell-list/index.vue';
    import ListWithButtons from './../items/list-with-links/index.vue';
    import OrdinaryList from './../items/ordinary-list/index.vue';
    import TextField from './../items/text-field/index.vue';

    export default {
        components: {
            CellList,
            ListWithButtons,
            OrdinaryList,
            TextField
        },
        props: ['info'],
        data() {
            return {
                Xcoordinates: 0,
                Ycoordinates: 0,
                customStyles: {}
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
                }
            },
            positionSelf(position) {
                let element = this.$el,
                    { hor, ver, CSSPosition } = position,
                    blockStyles = {
                        width: element.clientWidth,
                        height: element.clientHeight
                    },
                    Xgap = 5,
                    Ygap = 30;

                // Добавим стили
                // this.customStyles.$set(width, `${width}px`);

                this.customStyles.position = CSSPosition;
                this.customStyles.top = 0;
                this.customStyles.left = 0;
                blockStyles = this.applyStyles(blockStyles);
                this.customStyles.transform = `translateX(${hor}px) translateY(${ver}px)`;
                this.$forceUpdate();
                // element.style.width = `${width}px`;
                // element.style.height = `${height}px`;
                // element.style.position = CSSPosition;
                // element.style.top = '0';
                // element.style.left = '0';
                // element.style.transform = `translateX(${hor}px) translateY(${ver}px)`;

                return {
                    hor: hor + blockStyles.width + Xgap,
                    ver: ver + blockStyles.height + Ygap
                };
            },
            applyStyles(stylesObj) {
                let element = this.$el,
                    { width, height } = stylesObj;

                if (!this.customStyles.width && !this.customStyles.height) {
                    this.customStyles.width = `${width}px`;
                    // this.customStyles.height = `${height}px`;
                    return {width: width, height: height}
                } else {
                    width = parseInt(this.customStyles.width);
                    height = parseInt(this.customStyles.height);
                    return {width: width, height: height}
                }
            },
            removeCustomStyles() {
                this.customStyles = {};
                // this.$forceUpdate();
            }
        }
    }
</script>

<style lang="scss" scoped>

    .cv-item-container {
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
            /*flex-basis: 47%;*/
        }

        @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
            /*float: left;*/
            width: 33%;
            /*padding: 0 7px 15px 7px;*/
            /*margin-right: 3px;*/
            margin-bottom: 0;
        }

    }

    .cv-item-wrapper {
        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding: 0 7px 15px 7px;
        }

    }
    
    .cv-item {
        position: relative;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding-bottom: 10px;
        }
    }

    .cv-item-body {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-bottom: 20px;
        @include border-radius(10px);
        background-color: #ffffff;
        @include box-shadow(
                        0 11px 15px -7px rgba(0,0,0,0.2),
                        0 24px 38px 3px rgba(0,0,0,0.14),
                        0 9px 46px 8px rgba(0,0,0,0.12)
        );

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding-bottom: 0;
        }
    }

    .cv-item-content {
        position: relative;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
    }

    .cv-item-title {
        @include reset-pad-marg();
        padding: 0 10px;
        margin-top: 10px;
        margin-bottom: 15px;
        text-align: center;
        font-size: 1.8em;
        color: $cv-item-text-color;

        @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            padding: 10px 10px;
            margin: 0;
        }
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