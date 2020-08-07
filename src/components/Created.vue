<template>
    <div>
        <div class="row">
            <q-icon
                class="clickable"
                @click="$emit('goBack')"
                name="navigate_before"
                color="blue"
                size="xl"
            />
            <q-btn flat class="center" color="primary" label='Add to Spotify' @click="createPlaylist" />
        </div>
        <q-scroll-area style="height: 45vh;">
        <div class="flex q-pa-md q-gutter-md justify-center">
            <div v-for="track in tracks" :key="track.id">
                <div class="row justify-center text-subtitle2 square">
                    {{ track.name }}
                </div>
                <q-card class="playlist-card">
                    <q-img :src="track.album.images[0].url" />
                </q-card>
            </div>
        </div>
        </q-scroll-area>
    </div>
</template>

<script>
import createPlaylistForm from './modals/createPlaylistForm'
import { SPOTIFY_API } from 'babel-dotenv'
const alerts = [
  {
    color: 'negative',
    message: 'Error creating playlist',
    icon: 'report_problem'
  },
  {
    color: 'primary',
    message: 'Playlist Created! Check your Spotify to listen now',
    icon: 'thumb_up'
  }
]
export default {
  name: 'Created',
  props: { tracks: { type: Array } },
  data: function () {
    return {
      items: []
    }
  },
  methods: {
    async createPlaylist () {
      this.$q.dialog({
        component: createPlaylistForm,
        parent: this
      }).onOk((data) => {
        const tracks = this.tracks.map(track => track.uri)
        this.$axios.post(`${SPOTIFY_API}/users/${this.$store.getters['auth/user'].id}/playlists`, data).then(res => {
          if (res.status === 201) {
            this.$axios.post(`${SPOTIFY_API}/playlists/${res.data.id}/tracks`, { uris: tracks })
            this.$q.notify(alerts[1])
            this.$emit('goBack')
          } else {
            this.$q.notify(alerts[0])
          }
        })
      })
    }
  }
}

</script>
<style scoped>
.playlist-card {
    height: 150px;
    width: 150px;
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
.center {
    display: block;
    margin: auto;
    padding-right: 46px;
}
</style>
