import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from 'Root/translations/ru.json';
import en from 'Root/translations/en.json';
import zh from 'Root/translations/zh.json';

Vue.use(VueI18n);

const messages = {
    'ru': ru,
    'en': en,
    'zh': zh
};

export const i18n = new VueI18n({
   locale: 'zh',
   fallbackLocale: 'en',
   messages
});