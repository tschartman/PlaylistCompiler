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
        <div class="flex q-pa-md q-gutter-md justify-center">
            <div v-for="item in items" :key="item.track.id">
                <Track @select="selectSong" :track="item.track" styles='height:150px;width:150px;cursor:pointer' />
            </div>
        </div>
        </q-scroll-area>
    </div>
</template>

<script>
import Track from './Track'
export default {
  name: 'Tracks',
  props: { playlist: { type: Object }, offset: { type: Number } },
  components: { Track },
  data: function () {
    return {
      items: []
    }
  },
  methods: {
    selectSong (song) {
      this.$emit('selectSong', song)
    }
  },
  async created () {
    const tracks = this.$store.getters['api/tracks'][this.playlist.id]
    if (tracks) {
      this.items = tracks
      this.$store.dispatch('api/checkTracks', { id: this.playlist.id })
      this.$store.dispatch('api/setPlaylists', { offset: this.offset, user: this.$store.getters['auth/user'] })
    } else {
      this.$q.loading.show({ delay: 400 })
      await this.$store.dispatch('api/setTracks', { id: this.playlist.id })
      this.items = this.$store.getters['api/tracks'][this.playlist.id]
      this.$q.loading.hide()
    }
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
