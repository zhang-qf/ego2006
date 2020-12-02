import Vue from 'vue'
// import DatePicker from 'element/lib/date-picker'
import VueI18n from 'vue-i18n'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)
// Vue.use(DatePicker)

const messages = {
  en: {
    message:{
        project: "project",
        params: "params",
        content: "content"
    },
    ...enLocale
  },
  zh: {
    message: {
        project: "商品管理",
        params: "规格参数",
        content: "广告分类管理"
    },
    ...zhLocale
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n