import axios from 'axios'

export default {
  state: {
    callbackPopup: false,
    supportPopup: false,
    requestPopup: false
  },
  actions: {
    openCallbackPopup({ commit }) {
      commit('openCallbackPopup')
    },
    openSupportPopup({ commit }) {
      commit('openSupportPopup')
    },
    openRequestPopup({ commit }) {
      commit('openRequestPopup')
    },
    closePopup({ commit }) {
      commit('closePopup')
    },
    async sendPopup({ commit }, { message, type }) {
      await axios.post(`${process.env.VUE_APP_API}/feedback`, {
        message,
        type
      }, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
        .then(res => {
          commit('closePopup')
        })
    }
  },
  mutations: {
    openCallbackPopup(state) {
      state.callbackPopup = true
    },
    openSupportPopup(state) {
      state.supportPopup = true
    },
    openRequestPopup(state) {
      state.requestPopup = true
    },
    closePopup(state) {
      state.callbackPopup = false
      state.supportPopup = false
      state.requestPopup = false
    }
  },
  getters: {
    getCallbackPopup: (s) => s.callbackPopup,
    getSupportPopup: (s) => s.supportPopup,
    getRequestPopup: (s) => s.requestPopup
  }
}
