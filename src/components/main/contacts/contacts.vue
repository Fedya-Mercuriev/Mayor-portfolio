<template lang="pug">
    section#contacts
        h2.block-title Будем знакомы
        p.block-description Меня зовут {{ contactInfo.name }} и вот как можно со мной связаться:
        div.social-networks
            p.social-networks__title Найди меня в социальных сетях
            a(v-for="item in contactInfo.socialNetworks" :href="item.link") {{ item.text }}
            p Или пиши на
                a(:href="contactInfo.email.link") почту
</template>

<script>
    export default {
        data() {
            return {
                contactInfo: {
                    name: "Глеб",
                    socialNetworks: {
                        vk: {
                            text: "ВК",
                            link: "https://vk.com/glb_llk"
                        },
                        telegram: {
                            text: "Телеграм",
                            link: "https://teleg.run/mayor_mayor"
                        },
                        github: {
                            text: "Github",
                            link: "https://github.com/Fedya-Mercuriev"
                        }
                    },
                    email: {
                        text: "Почта",
                        link: "mailto:gleb.gorkoltsev@yandex.ru?subject=Приходите к нам работать"
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>