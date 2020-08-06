<template>
    <div>
        <h5 class="title">Playlists</h5>
        <q-scroll-area style="height: 38vh;">
        <div class="flex q-pa-md q-gutter-md justify-center">
          <div v-for="playlist in playlists" :key="playlist.id">
            <div class="row justify-center text-subtitle2 square">
                {{ playlist.name }}
            </div>
            <q-card class="playlist-card"  @click="$emit('selectPlaylist', playlist)">
                <q-img :src="playlist.images[0].url" />
            </q-card>
          </div>
        </div>
        </q-scroll-area>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="current"
            :max="Math.ceil(this.total / 10)"
            :direction-links="true"
            :boundary-links="true"
            icon-first="skip_previous"
            icon-last="skip_next"
            icon-prev="fast_rewind"
            icon-next="fast_forward"
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
    }
  },
  methods: {
    async grabPlaylist (offset) {
      const playlists = await this.$axios.get(`https://api.spotify.com/v1/users/${}/playlists?limit=10&offset=${offset}`)
      this.playlists = playlists.data.items
    }
  },
  async created () {
    const playlists = await this.$axios.get(`https://api.spotify.com/v1/users/${}/playlists?limit=10`)
    this.total = playlists.data.total
    this.playlists = playlists.data.items
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
