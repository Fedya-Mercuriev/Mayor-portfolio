<template lang="pug">
    div#app(ref="app")
        Header
        main.main
            Design
            Portfolio
            CV
            Contacts
</template>

<script>
    import Header from './header/index.vue';
    import Design from './main/design/index.vue';
    import Portfolio from './main/portfolio/index.vue';
    import CV from './main/cv/index.vue';
    import Contacts from './main/contacts/index.vue';

    export default {
        name: 'app',
        components: {
            Header,
            Design,
            Portfolio,
            CV,
            Contacts
        },
        data() {
            return {
                currentSection: ""
            }
        },
        mounted() {
            window.scrollBy(0,0);
            let ctx = this,
                hash = null,
                Yoffset = null,
                result = null;
            window.addEventListener('scroll', function() {
                setTimeout(() => {
                    Yoffset = window.pageYOffset + 60;
                    ctx.$children.forEach(item => {
                        if (Yoffset > item.$el.offsetTop - 1 && Yoffset < item.$el.offsetTop + item.$el.clientHeight + 1) {
                            if (result !== item.$el.id) {
                                result = item.$el.id;
                                console.log(`Текущий элемент: ${result}`);
                                return result;
                            }
                        }
                    });
                }, 200);
            })
        },
        methods: {
            controlScroll(block) {
                if (block) {
                    document.body.classList.add('block-scroll');
                } else {
                    document.body.classList.remove('block-scroll');
                }
            }
        }
    }
</script>