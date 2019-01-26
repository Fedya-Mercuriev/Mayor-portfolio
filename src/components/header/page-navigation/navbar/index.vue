<template src="./template.pug" lang="pug"></template>

<script>
    import PageNavigation from '../navbar-menu/index.vue';

    export default {
        components: {
            PageNavigation
        },
        data() {
            return {
                siteTitles: ["майор-майор", "mayor-mayor", "马约尔–马约尔"],
                currentIndex: 0,
                menuIsShown: false
            }
        },
        beforeMount: function() {
            if (window.innerWidth <= 768) {
                this.menuIsShown = false;
                return;
            }
            this.menuIsShown = true;
        }
    }
</script>

<style lang="scss">

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #000000;

    @media screen and (max-width: map-deep-get($devices, 'mobile-l')) {
        height: 60px;
    }

    @media screen and (min-width: map-deep-get($devices, 'tablet')) {
        height: 66px;
    }

    &__inner {
        /*box-sizing: border-box;*/
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;
        justify-content: space-between;
        max-width: 1024px;
        height: inherit;
        padding: 0 20px;
        @include centrifyBlock();

        @media only screen and (max-width: map-deep-get($devices, 'mobile-l')) {
            padding: 0 20px;
        }

        @media only screen and (max-width: map-deep-get($devices, 'tablet')) {
            padding: 0 23px;
        }
    }
}

.site-logo {
    position: relative;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;

    &__img {
        width: 50px;
        height: 50px;
    }
}

.site-title {
    display: none;

    @media only screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
        display: inline-block;
        margin-left: 20px;
        color: #ffffff;
    }
}

.trigger-mobile-menu-btn {
    position: relative;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    width: 49px;
    padding: 15px 10px;

    @media only screen and (min-width: map-deep-get($devices, 'tablet') + 1px) {
        display: none;
    }

    @media only screen and (min-width: map-deep-get($devices, 'tablet')) {
        padding: 20px 6px;
    }

    @media only screen and (max-width: map-deep-get($devices, 'mobile-l')) {
        padding: 18px 10px;
    }

    &--active {
        .mobile-menu-icon-stroke {
            background-color: #000000;
        }
    }
}

.mobile-menu-icon-stroke {
    display: block;
    height: 3px;
    background-color: #ffffff;
    @include transition(background-color 0.3s);
}
</style>