<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class='bg-grey-10'>
        <q-toolbar-title>
          QuickMix
        </q-toolbar-title>
        <q-icon class="clickable" name="info_outline" size='md' @click="credits()"></q-icon>
        <q-toggle :value="$store.getters['style/dark']" @input="toggleDark"  />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Credits from 'src/components/modals/Credits'
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  methods: {
    credits () {
      this.$q.dialog({
        component: Credits,
        parent: this
      })
    },
    toggleDark () {
      this.$store.dispatch('style/toggleDark', { vm: this })
    }
  }
}
</script>
<style scoped>
.clickable {
  cursor: pointer;
}
</style>
