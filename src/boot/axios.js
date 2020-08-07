import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export default ({ app, router, store, Vue }) => {
  const refreshAuthLogic = async failedRequest => {
    await store.dispatch('auth/refreshToken')
    failedRequest.response.config.headers.Authorization = 'Bearer ' + store.getters['auth/token']
  }

  createAuthRefreshInterceptor(axios, refreshAuthLogic)
  axios.defaults.headers.common.Authorization = `Bearer ${store.getters['auth/token']}`
  Vue.prototype.$axios = axios
}
