<template lang="pug">
    div#cv
        h2.block-title Резюме
        p.block-description А это резюме. Да
        div.cv-content-wrapper
</template>

<script>
    export default {
        data() {
            return {
                cvData: {
                    education: {
                        title: "Высшее образование",
                        data: [{
                            text: "Томский политехнический университет (2013 - 2018)"
                        }, {
                            text: "Харбинский политехнический университет (2017)"
                        }]
                    },
                    spokenLanguages: {
                        title: "Владение языками",
                        data: [{
                            text: "Английский (владею свободно: IELTS 6.9)"
                        }, {
                            text: "Китайский (владею свободно: HSK5)"
                        }]
                    },
                    courses: {
                        title: "Курсы",
                        data: [{
                            text: "Brilliant – Computer Science (Brilliant.ru)",
                            hasCertificate: ""
                        }, {
                            text: "Воркшоп «Яндекс Перемена» (г. Новосибирск)",
                            hasCertificate: ""
                        }, {
                            text: "Яндекс – Тонкости Верстки (Coursera)",
                            hasCertificate: false
                        }, {
                            text: "HTML Академия – Базовый HTML и CSS",
                            hasCertificate: "скачано с торрента"
                        }, {
                            text: "HTML Академия – Продвинутый HTML и CSS",
                            hasCertificate: "скачано с торрента"
                        }, {
                            text: "Learn.javascript – Javascript/DOM/Интерфейсы",
                            hasCertificate: {
                                link: "https://learn.javascript.ru/courses/js-20180918/gleb-gorkoltzev/ru/certificate.jpg"
                            }
                        }]
                    },
                    stack: {
                        title: "Стэк технологий",
                        data: ["HTML5", "CSS3", "JS (ES5, ES6)", "Vue.js", "LESS", "SCSS", "Pug"]
                    },
                    graphicSoftware: {
                        title: "Владение графическими ПО",
                        data: ["Photoshop", "Sketch", "Figma"]
                    },
                    desiredSkills: {
                        title: "Профильные навыки",
                        data: [{
                            text: "Адаптивная верстка"
                        }, {
                            text: "Кроссбраузерная верстка"
                        }, {
                            text: "Знаю основы UI/UX"
                        }]
                    },
                    undesiredSkills: {
                        title: "Непрофильные навыки",
                        data: [{
                            text: "Чувство прекрасного"
                        }, {
                            text: "Умеренный перфекционизм"
                        }]
                    },
                    extra: {
                        title: "Дополнительно о себе",
                         data: [{
                            title: "Проживание и обучение в Китае (2017 - 2018)"
                         }, {
                             title: "Преподавание английского в Китае и России"
                         }, {
                            title: "Дистанционное преподавание английского китайцам (2017 – настоящее время)"
                         }]
                    },
                    about: {
                        title: "О себе",
                        data: "Задача организации, в особенности же постоянный количественный рост и сфера нашей активности позволяет оценить значение новых предложений. Повседневная практика показывает, что дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание форм развития. Задача организации, в особенности же постоянный количественный рост и сфера нашей активности играет важную роль в формировании систем массового участия.\n" +
                            "\n" +
                            "Не следует, однако забывать, что дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке модели развития. Идейные соображения высшего порядка, а также сложившаяся структура организации позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач. Товарищи! сложившаяся структура организации позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности позволяет оценить значение направлений прогрессивного развития. Значимость этих проблем настолько очевидна, что новая модель организационной деятельности играет важную роль в формировании новых предложений. Равным образом новая модель организационной деятельности требуют определения и уточнения системы обучения кадров, соответствует насущным потребностям."
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    #cv {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .block-title {
        @include reset-pad-marg();
        margin-top: 20px;
        margin-bottom: 16px;
        color: $block-title-color;

        @media screen and (max-width: map-deep-get($devices, 'mobile-l')) {
            font-size: 2em;
        }

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            font-size: 3.3em;
        }
    }

    .block-description {
        @include reset-pad-marg();
        margin-bottom: 30px;
        color: $block-description-color;
        text-align: center;

        @media screen and (min-width: map-deep-get($devices, 'mobile-l') + 1px) {
            font-size: 1.2em;
        }
    }

    .cv-content-wrapper {
        display: flex;
        flex-direction: column;
    }
</style>