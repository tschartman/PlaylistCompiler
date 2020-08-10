<template>
    <div>
        <div class="row justify-center">
            <q-img class="clickable" @click="link(track.external_urls.spotify)" :src="$store.getters['style/dark'] ? 'spotify-light.png' : 'spotify.png'" style="width:15px; height:15px;"/>
        </div>
        <div class="row justify-center text-subtitle2 square">
            {{ track.name }}
        </div>
        <q-card :style="styles" @click="$emit('select', track)">
            <q-img :src="track.album.images[0].url" />
        </q-card>
    </div>
</template>
<script>
export default {
  name: 'Track',
  props: { track: { type: Object }, styles: { type: String } },
  data: function () {
    return {
    }
  },
  methods: {
    link (url) {
      window.open(url, '_system')
    }
  }
}
</script>
<style scoped>
.square {
    margin: 0;
    max-width: 150px;
    max-height: 22px;
}
.link {
    margin: 0;
    padding: 0;
}
.clickable {
    cursor: pointer;
}
</style>
