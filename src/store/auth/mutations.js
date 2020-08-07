
export function SET_TOKEN (state, payload) {
  state.refresh = payload.refresh
  state.token = payload.token
}

export function SET_USER (state, payload) {
  state.user = payload
}

export function SET_SECRET (state, payload) {
  state.secret = payload.secret
}
