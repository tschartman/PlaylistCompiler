import { SPOTIFY_API } from 'babel-dotenv'
import axios from 'axios'

export async function setPlaylists (context, payload) {
  const playlists = await axios.get(`${SPOTIFY_API}/users/${payload.user}/playlists?limit=10&offset=${payload.offset}`)
  if (!context.state.playlists[10]) {
    context.dispatch('setTotal', { total: playlists.data.total })
  }
  context.commit('SET_PLAYLISTS', { playlists: playlists.data.items, offset: payload.offset })
}

export async function checkPlaylists (context, payload) {
  const playlists = await axios.get(`${SPOTIFY_API}/users/${payload.user}/playlists?limit=10&offset=${payload.offset}`)
  const current = context.getters.playlists[payload.offset]
  const results = playlists.data.items.filter(({ id: id1 }) => !current.some(({ id: id2 }) => id1 === id2))
  if (results) {
    context.commit('SET_PLAYLISTS', { playlists: playlists.data.items, offset: payload.offset })
  }
}

export async function setTracks (context, payload) {
  const tracks = await axios.get(`${SPOTIFY_API}/playlists/${payload.id}/tracks`)
  context.commit('SET_TRACKS', { tracks: tracks.data.items, id: payload.id })
}

export async function checkTracks (context, payload) {
  const tracks = await axios.get(`${SPOTIFY_API}/playlists/${payload.id}/tracks`)
  const current = context.getters.tracks[payload.id]
  const results = tracks.data.items.filter(({ track: track1 }) => !current.some(({ track: track2 }) => track2.id === track1.id))
  if (results) {
    context.commit('SET_TRACKS', { tracks: tracks.data.items, id: payload.id })
  }
}

export function setCurrent (context, payload) {
  context.commit('SET_CURRENT', { current: payload.current })
}

export function setTotal (context, payload) {
  context.commit('SET_TOTAL', { total: payload.total })
}

export function clear (context) {
  context.commit('CLEAR')
}
