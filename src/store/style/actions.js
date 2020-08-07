
export function toggleDark (context, { vm }) {
  vm.$q.dark.toggle()
  context.commit('TOGGLE_DARK')
}
