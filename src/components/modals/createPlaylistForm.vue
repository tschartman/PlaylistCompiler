<template>
  <div class="row justify-center items-center">
    <q-dialog ref="dialog" @hide="cancel">
      <q-card class="screen" flat>
        <q-card-section>
          <form>
            <h5>New Playlist</h5>
            <div class="q-pa-md">
              <q-input
                ref="name"
                label="Playlist Name"
                v-model="name"
                :rules="[val => !!val || 'Field is required']"
              ></q-input>
            </div>
            <div class="row justify-start">
                <q-checkbox
                    class="q-ml-sm float-left"
                    v-model="priv"
                    label="Private"
                    color="teal"
                />
                <q-checkbox
                    class="q-ml-sm float-left"
                    v-model="collab"
                    label="Collaborative"
                    color="teal"
                />
            </div>
          </form>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn flat @click="cancel" color="dark">cancel</q-btn>
          <q-btn flat class="mr-4" @click="submit" color="primary">submit</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      priv: false,
      collab: false
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    submit () {
      this.$refs.name.validate()
      if (!this.$refs.name.hasError) {
        this.$emit('ok', { name: this.name, public: !this.priv, collaborative: this.collab })
        this.hide()
      }
    },
    cancel () {
      this.hide()
    }
  }
}
</script>
<style scoped>
h5 {
  margin: 0;
}
.loading {
  font-size: 25px;
}

.logo {
  margin: auto;
  display: block;
}

.authError {
  color: red;
}

.screen {
  padding: 1em;
  flex: 1;
  max-width: 500px;
}

.sep {
  margin: 1em;
}
</style>
