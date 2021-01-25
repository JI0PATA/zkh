import axios from 'axios'

export default {
  state: {
    orders: [],
    countNew: null
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
    },
    setNewOrders(state, count) {
      state.countNew = count
    }
  },
  actions: {
    async fetchOrdersForTenant({ commit }, status) {
      await axios.get(`${process.env.VUE_APP_API}/orders?status=${status}`, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
        .then(res => {
          commit('setOrders', res.data.orders)
        })
    },
    async fetchOrders({ commit }, status) {
      await axios.get(`${process.env.VUE_APP_API}/orders/operator?status=${status}`, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
        .then(res => {
          commit('setOrders', res.data.orders)
        })
    },
    async cancelOrder({ dispatch, commit }, { message, wasCall, order }) {
      await axios.post(`${process.env.VUE_APP_API}/orders/${order.id}/status/cancel`, {
        message,
        was_call: wasCall,
        _method: 'PATCH'
      }, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
        .then(res => {})
    },
    async setFirstStep({ commit }, { hourForSelect, order }) {
      await axios.post(`${process.env.VUE_APP_API}/orders/${order.id}/status/search`, {
        _method: 'PATCH',
        hour_for_select: hourForSelect
      }, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
    },
    async setSecondStep({ commit }, { dateTime, order }) {
      await axios.post(`${process.env.VUE_APP_API}/orders/${order.id}/status/specialist`, {
        _method: 'PATCH',
        specialist_arrive_at: dateTime
      }, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
    },
    async setThirdStep({ commit }, order) {
      await axios.post(`${process.env.VUE_APP_API}/orders/${order.id}/status/done`, {
        _method: 'PATCH'
      }, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
    },
    async orderReturn({ commit }, order) {
      await axios.post(`${process.env.VUE_APP_API}/orders/${order.id}/status/return`, {
        _method: 'PATCH'
      }, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
    },
    async getCountNew({ commit }) {
      await axios.get(`${process.env.VUE_APP_API}/orders/count_new`, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
        .then(res => {
          commit('setNewOrders', res.data.count)
        })
    },
    async orderRate({ dispatch }, { order, rate }) {
      await axios.post(`${process.env.VUE_APP_API}/orders/${order.id}/rate`, {
        rate
      }, {
        headers: {
          Authorization: `Bearer ${this.getters.info.api_token}`
        }
      })
        .then(res => {
          dispatch('fetchOrdersForTenant', 1)
        })
    }
  },
  getters: {
    orders: (s) => s.orders,
    countNew: (s) => s.countNew
  }
}
