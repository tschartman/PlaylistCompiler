<template>
    <div>
        <h4 class="title">Select up to 5 Songs</h4>
        <div v-if="tracks.length > 0" class="flex flex-center">
          <q-scroll-area
              horizontal
              :style="'height: 150px;' + 'width:' + 125 * tracks.length +'px;'"
          >
            <div class="row no-wrap q-pa-sm q-gutter-md">
                <div v-for="track in tracks" :key="track.id">
                    <div class="row justify-center text-subtitle2 square">
                        {{ track.name }}
                    </div>
                    <q-card class="playlist-card" @click="$emit('removeSong', track)">
                        <q-img :src="track.album.images[0].url" />
                    </q-card>
                </div>
            </div>
          </q-scroll-area>
        </div>
        <div v-else class="flex flex-center q-pa-md">
          <q-card class="playlist-card">
            <q-skeleton height="100px" square />
          </q-card>
        </div>
        <div class="flex flex-center">
            <q-btn flat label='Make Playlist' @click="$emit('makePlaylist')" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'Selection',
  props: { tracks: { type: Array } },
  data: function () {
    return {
    }
  },
  methods: {
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
.clickable {
    cursor: pointer;
}
.square {
    max-width: 100px;
    max-height: 22px;
}

</style>
