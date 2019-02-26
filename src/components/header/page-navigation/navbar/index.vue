<template lang="pug">
    div.navbar
        div.navbar__inner
            a.site-logo(href="https://mayor-mayor.com")
                div.site-logo-wrapper
                    Logo
                span.site-title {{ siteTitles[currentIndex] }}
            page-navigation( :menuItems="menuItems")
            MobileMenu(:appearance="appearance" :menuItems="menuItems" :availableLanguages="availableLanguages" :menuVisible="mobileMenuIsShown")
            a.trigger-mobile-menu-btn(
                role="button"
                @click.stop="controlMenu()"
                :class="{'trigger-mobile-menu-btn--active': mobileMenuIsShown}"
            )
                i.mobile-menu-icon-stroke
                i.mobile-menu-icon-stroke
                i.mobile-menu-icon-stroke
</template>

<script>
    import Logo from 'Root/svg/site-logo.svg';
    import PageNavigation from '../navbar-menu/index.vue';
    import MobileMenu from '../mobile-menu/mobile-menu.vue';
    import { EventBus } from './../../../../event-bus.js';

    export default {
        components: {
            Logo,
            PageNavigation,
            MobileMenu
        },
        props: {
            appearance: String
        },
        data() {
            return {
                siteTitles: ["майор-майор", "mayor-mayor", "馬藥爾–馬藥爾"],
                currentIndex: 0,
                mobileMenuIsShown: false,
                blockScroll: false,
                menuItems: {
                    design: {
                        text: 'menu.design',
                        hash: "#design",
                        isCurrent: false
                    },
                    portfolio: {
                        text: 'menu.portfolio',
                        hash: "#portfolio",
                        isCurrent: false
                    },
                    cv: {
                        text: 'menu.cv',
                        hash: "#cv",
                        isCurrent: false
                    },
                    contacts: {
                        text: 'menu.contacts',
                        hash: "#contacts",
                        isCurrent: false
                    }
                },
                availableLanguages: [
                    {
                        text: "Русский",
                        data: "ru"
                    },
                    {
                        text: "English",
                        data: "en"
                    },
                    {
                        text: "简体中文",
                        data: "zh"
                    }
                ]
            }
        },
        mounted() {
            let root = this.$parent.$parent,
                ctx = this;
          this.$nextTick(function() {
              window.addEventListener('resize', function() {
                  // Нужно скрыть открытые окна
                  EventBus.$emit('close-secondary-menu');
                  ctx.unlockScroll(root);
              })
          });
          setInterval(() => {
              if (this.currentIndex >= this.siteTitles.length - 1) {
                  this.currentIndex = 0;
              } else {
                  this.currentIndex++;
              }
          }, 1500);
        },
        methods: {
            unlockScroll(root) {
                this.blockScroll = false;
                root.controlScroll(this.blockScroll);
            },
            controlMenu() {
                this.mobileMenuIsShown = !this.mobileMenuIsShown;
                this.blockScroll = !this.blockScroll;
                let root = this.$parent.$parent;
                root.controlScroll(this.blockScroll);
            }
        }
    }
</script>

<style lang="scss">

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 60px;
    padding-top: 15px;
    background-color: transparent;

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
        width: 85%;
        height: inherit;
        padding: 0 20px;
        @include border-radius($large-component-border-radius);
        @include centrifyBlock();
        background-color: $navbar-bg;

        @media only screen and (max-width: map-deep-get($devices, 'mobile-l')) {
            padding: 0 20px;
        }

        @media only screen and (max-width: map-deep-get($devices, 'tablet')) {
            padding: 0 23px;
        }
    }
}

.site-logo-wrapper {
    width: 50px;
    height: 50px;
}

.site-logo {
    position: relative;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 15px;
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
        margin-left: 15px;
        font-size: 1.2em;
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

    @media only screen and (max-width: map-deep-get($devices, 'mobile-l')) {
        padding: 18px 10px;
    }

    @media only screen and (min-width: map-deep-get($devices, 'tablet'))
    and (max-width: map-deep-get($devices, 'desktop')) {
        /*width: 45px;*/
        padding: 20px 6px;
    }

    @media only screen and (min-width: map-deep-get($devices, 'desktop') + 1px) {
        display: none;
    }

    &--active {
        .mobile-menu-icon-stroke {
            background-color: #f9aa33;
            @include transition(all 0.3s);

            &:nth-child(1) {
                @include transform(translateY(8px) rotate(45deg));
            }

            &:nth-child(2) {
                opacity: 0;
            }

            &:nth-child(3) {
                @include transform(translateY(-8px) rotate(-45deg));
            }
        }
    }
}

.mobile-menu-icon-stroke {
    display: block;
    height: 3px;
    background-color: #ffffff;
    opacity: 1;
    @include transform(translateY(0) rotate(0deg));
    @include transition(all 0.3s);

}
</style>