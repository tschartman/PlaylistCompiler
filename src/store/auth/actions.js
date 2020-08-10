import axios from 'axios'
import qs from 'querystring'
import { REDIRECT_URI, SPOTIFY_ID, SPOTIFY_API } from 'babel-dotenv'

export function setSecret (context, payload) {
  context.commit('SET_SECRET', { secret: payload.secret })
}

export async function refreshToken (context) {
  const body = {
    client_id: SPOTIFY_ID,
    grant_type: 'refresh_token',
    refresh_token: context.getters.refresh
  }

  delete axios.defaults.headers.common.Authorization
  const res = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(body))
  context.commit('SET_TOKEN', { refresh: res.data.refresh_token, token: res.data.access_token })
}

export async function setToken (context, payload) {
  const body = {
    client_id: SPOTIFY_ID,
    grant_type: 'authorization_code',
    code: payload.code,
    redirect_uri: REDIRECT_URI,
    code_verifier: context.getters.secret
  }

  delete axios.defaults.headers.common.Authorization
  const res = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(body))
  await context.commit('SET_TOKEN', { refresh: res.data.refresh_token, token: res.data.access_token })
  await context.dispatch('setUser')
}

export async function setUser (context) {
  const res = await axios.get(`${SPOTIFY_API}/me`)
  context.commit('SET_USER', res.data.id)
}

export function clear (context) {
  context.commit('CLEAR')
}
