import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import style from './style'
import api from './api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      auth,
      style,
      api
    },
    plugins: [createPersistedState({
      storage: window.sessionStorage
    })],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
