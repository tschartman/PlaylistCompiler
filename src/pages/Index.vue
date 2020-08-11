<template>
  <q-page class="full-height">
    <div v-if="$store.getters['auth/user']">
      <Selection @makePlaylist="makePlaylist" @removeSong="removeSong" :tracks="selected" />
      <q-separator />
      <Playlists v-if="page === 'playlists'" @selectPlaylist="selectPlaylist" />
      <Tracks v-else-if="page === 'tracks'" @goBack="back" @selectSong="selectSong" :offset="offset" :playlist="playlist" />
      <Created v-else-if="page === 'created'" @goBack="back" :tracks="createdList" />
    </div>
    <div class="height" v-else>
      <div class="row justify-center">
        <q-img class="logo" src="spotify-logo.png" style="width:200px; height:60px;"/>
      </div>
      <div class="row justify-center">
        <q-btn flat size="large" label="Link Spotify" v-on:click="redirect()"></q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
import pkceChallenge from 'pkce-challenge'
import { REDIRECT_URI, SPOTIFY_ID, SPOTIFY_API } from 'babel-dotenv'
import Playlists from 'components/Playlists'
import Tracks from 'components/Tracks'
import Selection from 'components/Selection'
import Created from 'components/Created'
export default {
  name: 'PageIndex',
  components: {
    Playlists,
    Tracks,
    Selection,
    Created
  },
  data: function () {
    return {
      page: 'playlists',
      playlist: {},
      offset: 0,
      selected: [],
      createdList: []
    }
  },
  methods: {
    async makePlaylist () {
      if (this.selected.length > 0) {
        const tracks = this.selected.map(track => track.id).join(',')
        const playlist = await this.$axios.get(`${SPOTIFY_API}/recommendations?seed_tracks=${tracks}`)
        this.createdList = playlist.data.tracks
        this.page = 'created'
      }
    },
    selectPlaylist (playlist, offset) {
      this.playlist = playlist
      this.offset = offset
      this.page = 'tracks'
    },
    selectSong (song) {
      if (!this.selected.find(s => s.id === song.id) && this.selected.length < 5) {
        this.selected.push(song)
      }
    },
    removeSong (song) {
      this.selected.splice(this.selected.indexOf(song), 1)
    },
    back () {
      this.page = 'playlists'
    },
    async redirect () {
      const length = Math.floor((Math.random() * (128 - 43)) + 43)
      const data = pkceChallenge(length)
      await this.$store.dispatch('auth/setSecret', { secret: data.code_verifier })
      const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_ID}&code_challenge_method=S256&code_challenge=${data.code_challenge}&scope=playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
      window.open(url, '_system')
    }
  }
}

</script>
<style scoped>
.logo {
  margin: 30px;
}
.height {
  height: 80vh;
  display: grid;
  align-content: center;
}
</style>
