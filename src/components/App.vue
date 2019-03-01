<template lang="pug">
    div#app(ref="app")
        Header(:appearance="appearance")
        main.main
            Design(:appearance="appearance")
            Portfolio(:appearance="appearance")
            CV(:appearance="appearance")
            Contacts(:appearance="appearance")
        Footer(:appearance="appearance")
</template>

<script>
    import Header from './header/index.vue';
    import Design from './main/design/index.vue';
    import Portfolio from './main/portfolio/portfolio.vue';
    import CV from './main/cv/index.vue';
    import Contacts from './main/contacts/contacts.vue';
    import Footer from './footer/footer.vue';
    import { EventBus } from './../event-bus.js';

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

    function handler() {
        let Yoffset = null,
            result = null;
        Yoffset = window.pageYOffset + 60;
        for (let i = 0; i < this.$children.length - 1; i++) {
            let item = this.$children[i];
            if (Yoffset > item.$el.offsetTop - 1 && Yoffset < item.$el.offsetTop + item.$el.clientHeight + 1) {
                if (result !== item.$el.id) {
                    result = item.$el.id;
                    // result - нзвание свойства, по которому будет получаться доступ к конкретному элементу меню
                }
            }
        }
        EventBus.$emit('highlight-li', result);
    }

    export default {
        name: 'app',
        components: {
            Header,
            Design,
            Portfolio,
            CV,
            Contacts,
            Footer
        },
        data() {
            return {
                appearance: 'light'
            }
        },
        mounted() {
            let ctx = this,
                handleScroll = debounce(handler, 200);

            window.addEventListener('scroll', handleScroll.bind(ctx));

            if (this.$i18n.locale === 'zh') {
                document.body.classList.add('zh');
            }

            EventBus.$on('change-language', (language) => {
                if (!document.body.classList.contains('zh') && language === 'zh') {
                    document.body.classList.add('zh');
                } else {
                    document.body.classList.remove('zh');
                }
            })
        },
        methods: {
            controlScroll(block) {
                if (block) {
                    document.documentElement.classList.add('block-scroll');
                } else {
                    document.documentElement.classList.remove('block-scroll');
                }
            }
        }
    }
</script>