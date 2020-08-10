<template>
    <div>
        <h5 class="title">Playlists</h5>
        <q-scroll-area style="height: 50vh;">
        <div class="flex q-pa-md q-gutter-md justify-center">
          <div v-for="playlist in playlists" :key="playlist.id">
            <div class="row justify-center">
              <q-img class="clickable" @click="link(playlist.external_urls.spotify)" :src="$store.getters['style/dark'] ? 'spotify-light.png' : 'spotify.png'" style="width:15px; height:15px;"/>
            </div>
            <div class="row justify-center text-subtitle2 square">
                {{ playlist.name }}
            </div>
            <q-card class="playlist-card"  @click="$emit('selectPlaylist', playlist, (current * 10) - 10)">
                <q-img v-if="playlist.images.length > 0" :src="playlist.images[0].url" />
            </q-card>
          </div>
        </div>
        </q-scroll-area>
        <div class="q-pa-sm flex flex-center">
          <q-pagination
            v-model="current"
            :color="$store.getters['style/dark'] ? 'grey' : 'black'"
            :max="Math.ceil(this.total / 10)"
            input
          >
            </q-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Playlists',
  data: function () {
    return {
      playlists: [],
      current: 1,
      total: 0
    }
  },
  watch: {
    current: function (newCurrent) {
      this.grabPlaylist((newCurrent * 10) - 10)
      this.$store.dispatch('api/setCurrent', { current: newCurrent })
    }
  },
  methods: {
    link (url) {
      window.open(url, '_system')
    },
    async grabPlaylist (offset) {
      const playlists = this.$store.getters['api/playlists'][offset]
      if (playlists) {
        this.playlists = playlists
        this.$store.dispatch('api/checkPlaylists', { offset: offset, user: this.$store.getters['auth/user'] })
      } else {
        this.$q.loading.show({ delay: 400 })
        await this.$store.dispatch('api/setPlaylists', { offset: offset, user: this.$store.getters['auth/user'] })
        this.playlists = this.$store.getters['api/playlists'][offset]
        this.$q.loading.hide()
      }
    }
  },
  async created () {
    await this.grabPlaylist(0)
    this.total = this.$store.getters['api/total']
    this.current = this.$store.getters['api/current']
  }
}

</script>
<style scoped>
.playlist-card {
    height: 150px;
    width: 150px;
    cursor: pointer;
}
.title {
  display: block;
  margin: auto;
  text-align: center;
}
.square {
    max-width: 150px;
    max-height: 22px;
}
</style>
