<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class='bg-grey-10'>
        <q-toolbar-title>
          QuickSet
        </q-toolbar-title>
        <q-toggle :value="$store.getters['style/dark']" @input="toggleDark"  />
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
    toggleDark () {
      this.$store.dispatch('style/toggleDark', { vm: this })
    }
  }
}
</script>
