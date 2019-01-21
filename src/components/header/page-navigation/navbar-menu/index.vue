<template src="./template.pug" lang="pug">

</template>

<script>
    import SecondaryNavbarMenu from '../secondary-navbar-menu/index.vue';

    export default {
        components: {
            SecondaryNavbarMenu
        },
        data() {
            return {
                menuBaseClass: 'navigation-menu',

                menuItems: [
                    {
                        text: "Рассуждение",
                        hash: "#make-cn-sites-better",
                        isCurrent: true
                    }, {
                        text: "Портфолио",
                        hash: "#portfolio",
                        isCurrent: false
                    }, {
                        text: "Резюме",
                        hash: "#cv",
                        isCurrent: false
                    }, {
                        text: "Контакты",
                        hash: "#contacts",
                        isCurrent: false
                    }
                ],
                menuItemClass: `${this.menuBaseClass}__menu-item`,
                secondaryMenuOpened: false
            }
        },
        computed: {

        },
        methods: {
            updateActiveMenuItems(event) {
                this.menuItems.forEach((item) => {
                    if (item.text === event.target.parentElement.innerText) {
                        item.isCurrent = true;
                    } else {
                        if (item.isCurrent) {
                            item.isCurrent = false;
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>