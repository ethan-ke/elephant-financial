import { login, logout, getInfo } from '@/api/user'
import { getAccessToken, setAccessToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    access_token: getAccessToken(),
    nickname: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ACCESS_TOKEN: (state, token) => {
    state.access_token = token
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        client_id: 1,
        client_secret: '4i6Nb0a73iJkD8wHgFX5Fq9Lp6RdO8ExFv1v2V1k',
        grant_type: 'password',
        username: username.trim(),
        password: password
      }).then(response => {
        const access_token = response.access_token
        commit('SET_ACCESS_TOKEN', access_token)
        console.log(access_token)
        setAccessToken(access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { nickname, avatar } = data

        commit('SET_NICKNAME', nickname)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

