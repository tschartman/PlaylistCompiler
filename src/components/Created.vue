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
            <h5 class="title">New Playlist</h5>
        </div>
        <q-scroll-area style="height: 40vh;">
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
export default {
  name: 'Created',
  props: { tracks: { type: Array } },
  data: function () {
    return {
      items: []
    }
  },
  methods: {
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
</style>
