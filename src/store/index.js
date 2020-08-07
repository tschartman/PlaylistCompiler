import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import style from './style'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      auth,
      style
    },
    plugins: [createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) =>
          // Set secure to true in prod!!!
          Cookies.set(key, value, {
            expires: 3,
            secure: !window.webpackHotUpdate
          }),
        removeItem: key => Cookies.remove(key)
      }
    })],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
