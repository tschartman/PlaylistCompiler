<template>
    <div>
        <div class="row">
            <q-icon
                class="clickable back"
                @click="$emit('goBack')"
                name="navigate_before"
                color="blue"
                size="xl"
            />
            <h5 class="title">{{ playlist.name }}</h5>
        </div>
        <q-scroll-area style="height: 55vh;">
        <div class="flex q-pa-md q-gutter-x-md q-gutter-y-xl justify-center">
            <div v-for="item in items" :key="item.track.id">
                <Track @select="selectSong" :track="item.track" style='height:150px;width:150px;cursor:pointer' />
            </div>
        </div>
        </q-scroll-area>
    </div>
</template>

<script>
import { SPOTIFY_API } from 'babel-dotenv'
import Track from './Track'
export default {
  name: 'Tracks',
  props: { playlist: { type: Object } },
  components: { Track },
  data: function () {
    return {
      items: []
    }
  },
  methods: {
    selectSong (song) {
      console.log(song)
      this.$emit('selectSong', song)
    }
  },
  async created () {
    this.$q.loading.show({ delay: 400 })
    const tracks = await this.$axios.get(`${SPOTIFY_API}/playlists/${this.playlist.id}/tracks`)
    this.$q.loading.hide()
    this.items = tracks.data.items
  }
}

</script>
<style scoped>

.title {
  display: block;
  margin: auto;
  text-align: center;
}
.clickable {
    cursor: pointer;
}
.back {
    margin-right: -46px;
}
</style>
