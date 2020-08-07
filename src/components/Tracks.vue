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
            <h5 class="title">{{ playlist.name }}</h5>
        </div>
        <q-scroll-area style="height: 45vh;">
        <div class="flex q-pa-md q-gutter-md justify-center">
            <div v-for="item in items" :key="item.track.id">
                <div class="row justify-center text-subtitle2 square">
                    {{ item.track.name }}
                </div>
                <q-card class="playlist-card" @click="$emit('selectSong', item.track)">
                    <q-img :src="item.track.album.images[0].url" />
                </q-card>
            </div>
        </div>
        </q-scroll-area>
    </div>
</template>

<script>
import { SPOTIFY_API } from 'babel-dotenv'
export default {
  name: 'Tracks',
  props: { playlist: { type: Object } },
  data: function () {
    return {
      items: []
    }
  },
  methods: {
  },
  async created () {
    const tracks = await this.$axios.get(`${SPOTIFY_API}/playlists/${this.playlist.id}/tracks`)
    this.items = tracks.data.items
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
.clickable {
    cursor: pointer;
}
.square {
    max-width: 150px;
    max-height: 22px;
}
</style>
