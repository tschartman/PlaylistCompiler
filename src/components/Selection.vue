<template>
    <div>
        <div v-if="tracks.length > 0" class="flex flex-center">
          <q-scroll-area
              horizontal
              :style="'height: 160px;' + 'width:' + 125 * tracks.length +'px;'"
          >
            <div class="row no-wrap q-pa-sm q-gutter-md">
                <div v-for="track in tracks" :key="track.id">
                  <Track :track="track" @select="removeSong(track)" style='height:100px;width:100px;cursor:pointer' />
                </div>
            </div>
          </q-scroll-area>
        </div>
        <div v-else class="flex flex-center q-pa-md skel">
          <q-card class="playlist-card">
            <q-skeleton height="100px" square />
          </q-card>
        </div>
        <div class="flex flex-center">
            <q-btn flat label='Create Mix' @click="$emit('makePlaylist')" />
        </div>
    </div>
</template>

<script>
import Track from './Track'
export default {
  name: 'Selection',
  props: { tracks: { type: Array } },
  components: { Track },
  data: function () {
    return {
    }
  },
  methods: {
    removeSong (track) {
      this.$emit('removeSong', track)
    }

  }
}

</script>
<style scoped>
.playlist-card {
    height: 100px;
    width: 100px;
    cursor: pointer;
}
.title {
  display: block;
  margin: auto;
  text-align: center;
}
.skel {
  margin-top: 13px;
}
.clickable {
    cursor: pointer;
}
.square {
    max-width: 100px;
    max-height: 22px;
}

</style>
