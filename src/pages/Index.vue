<template>
  <div>
    <Selection @makePlaylist="makePlaylist" @removeSong="removeSong" :tracks="selected" />
    <q-separator />
    <Playlists v-if="page === 'playlists'" @selectPlaylist="selectPlaylist" />
    <Tracks v-else-if="page === 'tracks'" @goBack="back" @selectSong="selectSong" :playlist="playlist" />
    <Created v-else-if="page === 'created'" @goBack="back" :tracks="createdList" />
  </div>
</template>

<script>
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
      selected: [],
      createdList: []
    }
  },
  methods: {
    async makePlaylist () {
      if (this.selected.length > 0) {
        const tracks = this.selected.map(track => track.id).join(',')
        const playlist = await this.$axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${tracks}`)
        this.createdList = playlist.data.tracks
        this.page = 'created'
      }
    },
    selectPlaylist (playlist) {
      this.playlist = playlist
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
    hashParser (hash) {
      const object = {}
      const attrs = hash.split('&')
      attrs.forEach(a => {
        const keyVal = a.split('=')
        object[keyVal[0]] = keyVal[1]
      })
      return object
    }
  },
  async created () {
    const hash = this.$route.hash
    if (hash) {
      const data = this.hashParser(hash.substring(1))
      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + data.access_token
    }
  }
}

</script>
