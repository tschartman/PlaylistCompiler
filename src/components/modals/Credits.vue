<template>
  <div class="row justify-center items-center">
    <q-dialog ref="dialog" @hide="hide">
      <q-card class="screen" flat>
        <div class="text-h6 q-pt-md row justify-center">Welcome to QuickMix!</div>
        <q-separator />
        <q-card-section>
        <div>
            Select up to 5 songs from any of your existing playlists to create a new one based on your selected songs.
        </div>
        </q-card-section>
        <q-card-section>
        <div class="row justify-center">Credits </div>
        <div>
            Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="around">
          <q-btn v-if="$store.getters['auth/token']" flat class="mr-4" @click="clear" color="negative">Unlink Spotify</q-btn>
          <q-btn flat class="mr-4" @click="hide" color="primary">Ok</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    clear () {
      this.$store.dispatch('auth/clear')
      this.$store.dispatch('api/clear')
      window.sessionStorage.clear()
      this.hide()
    }
  }
}
</script>
