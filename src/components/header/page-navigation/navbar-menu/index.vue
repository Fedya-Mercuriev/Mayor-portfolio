<template lang="pug">
    nav.navbar-menu-wrapper
    ul(:class="menuBaseClass" @click="updateActiveMenuItem(itemName)")
        li(:is="NavbarMenuItem" v-for="item in menuItems" :menuItem="menuItemParams") {{ item.text }}}
        li.secondary-navbar-menu-wrapper
            additionalNavbarMenu
        a.trigger-mobile-menu(role="button")
</template>

<script>
    import NavbarMenuItem from '../navbar-menu-item/index';
    import additionalNavbarMenu from '../additional-navbar-menu/index';

    export default {
        name: "page-navigation",
        data() {
            return {
                menuBaseClass: 'navbar-menu',
                menuItems: [
                    {
                        text: "Рассуждение",
                        hash: "make-cn-sites-great",
                        isCurrent: true
                    }, {
                        text: "Портфолио",
                        hash: "portfolio",
                        isCurrent: false
                    }, {
                        text: "Резюме",
                        hash: "cv",
                        isCurrent: false
                    }, {
                        text: "Контакты",
                        hash: "contacts",
                        isCurrent: false
                    }
                ],
                menuItemClass: `${this.menuBaseClass}__menu-item`
            }
        },
        computed: {
            menuItemParams() {
                let result = {};
                Object.assign(result, this.menuItems, this.menuItemClass);
                return result;
            }
        },
        methods: {
            updateActiveMenuItem(itemName) {
                this.menuItems.forEach((item) => {
                    if (item.text === itemName) {
                        item.isCurrent = true;
                    } else {
                        if (item.isCurrent) {
                            item.isCurrent = false;
                        }
                    }
                })
            }
        },
        components: {
            NavbarMenuItem,
            additionalNavbarMenu
        }
    }
</script>

<style scoped>

</style>