import Vue from 'vue'
import Vuex from 'vuex'
import logMod from './mods/logMod'
import wangMod from './mods/wangMod'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    logMod,
    wangMod
  }
})
