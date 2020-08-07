<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'CallBack',
  components: {
  },
  data: function () {
    return {
    }
  },

  async created () {
    const query = this.$route.query
    if (query.code) {
      await this.$store.dispatch('auth/setToken', { code: query.code })
      this.$router.push('/')
    }
  }
}

</script>
