import Vue from 'vue'
import VueI18n from 'vue-i18n'
import EN from './en'
import ZH_CN from './zh-cn'
import ZH_HK from './zh-hk'
import { getLocale, setLocale } from '../../services/utils/auth'

Vue.use(VueI18n)

let lang = getLocale() || 'en'
if (!getLocale()) {
    if (window && window.navigator && window.navigator.language) {
        const langCode = window.navigator.language;
        if (/^zh\b/.test(langCode)) {
            if (langCode === 'zh-HK' || langCode === 'zh-TW') {
                lang = 'zh_hk';
            } else {
                lang = 'zh_cn';
            }
        }
    }
    setLocale(lang)
}

const messages = {
    en: EN,
    zh_cn: ZH_CN,
    zh_hk: ZH_HK,
}
const i18n = new VueI18n({
    locale: lang,
    messages: messages
})

export default i18n