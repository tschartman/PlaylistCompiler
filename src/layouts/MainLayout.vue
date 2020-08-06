<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Playlist Compiler
        </q-toolbar-title>
        <q-btn
          flat
          label="Spotify"
          @click="redirect()"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {

    }
  },
  methods: {
    redirect () {

    }
  }
}
</script>
