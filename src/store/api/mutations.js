import { getDefaultState } from './state'

export function SET_PLAYLISTS (state, payload) {
  state.playlists[payload.offset] = payload.playlists
}

export function SET_TRACKS (state, payload) {
  state.tracks[payload.id] = payload.tracks
}

export function SET_TOTAL (state, payload) {
  state.total = payload.total
}

export function SET_CURRENT (state, payload) {
  state.current = payload.current
}

export function CLEAR (state) {
  Object.assign(state, getDefaultState())
}
