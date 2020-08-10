<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
window.handleOpenURL = function (url) {
  const split = url.split('?')
  if (split[1]) {
    const param = split[1].split('=')
    if (param[1]) {
      window.dispatchEvent(new CustomEvent('code', { detail: { code: param[1] } }))
    }
  }
}
export default {
  name: 'App',
  methods: {
    async listenForCode (data) {
      this.$q.loading.show({ delay: 400 })
      await this.$store.dispatch('auth/setToken', { code: data.detail.code })
      this.$q.loading.hide()
    }
  },
  created () {
    window.addEventListener('code', this.listenForCode, false)
    this.$q.dark.set(this.$store.getters['style/dark'])
  },
  beforeDestroy () {
    window.removeEventListener('code', this.listenForCode, false)
  }
}
</script>
