import Vue from 'vue'
import Vuex from 'vuex'
import Popup from './popup'
import Toast from './toast'
import Orders from './orders'
import router from '@/router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {},
    roles: {
      0: 'Жилец',
      1: 'Оператор',
      2: 'Организация',
      3: 'Администратор'
    },
    organizations: [],
    operators: [],
    classificators: [],
    tenants: [],
    operatorsForChange: []
  },
  mutations: {
    setInfo(state, user) {
      state.info = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearInfo(state) {
      localStorage.removeItem('user')
      state.info = {}
      router.push({ name: 'LoginTenant' })
    },
    setOrganizations(state, organizations) {
      state.organizations = organizations
    },
    setTenants(state, tenants) {
      state.tenants = tenants
    },
    setOperators(state, operators) {
      state.operators = operators
    },
    setClassificators(state, classificators) {
      state.classificators = classificators
    },
    setOperatorsForChange(state, operators) {
      state.operatorsForChange = operators
    }
  },
  actions: {
    logout({ commit }) {
      commit('clearInfo')
    },
    toggleNotification({ commit, getters }, val) {
      axios.post(`${process.env.VUE_APP_API}/profile/notifications`, {
        notification: val
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    },
    async fetchOrganizations({ commit, getters }) {
      await axios.get(`${process.env.VUE_APP_API}/users?role=2`, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
        .then(res => {
          commit('setOrganizations', res.data.users)
        })
    },
    async fetchTenants({ commit, getters }) {
      await axios.get(`${process.env.VUE_APP_API}/users?role=0`, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
        .then(res => {
          commit('setTenants', res.data.users)
        })
    },
    async fetchOperators({ commit, getters }) {
      await axios.get(`${process.env.VUE_APP_API}/users?role=1`, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
        .then(res => {
          commit('setOperators', res.data.users)
        })
    },
    async fetchOperatorsForOrganization({ commit, getters }) {
      await axios.get(`${process.env.VUE_APP_API}/operators/forChange`, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
        .then(res => {
          commit('setOperatorsForChange', res.data.users)
        })
    },
    async saveUser({ commit, getters }, user) {
      await axios.post(`${process.env.VUE_APP_API}/users/${user.id}`, {
        ...user,
        _method: 'PATCH'
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    },
    async addUser({ commit, getters }, user) {
      await axios.post(`${process.env.VUE_APP_API}/users`, {
        ...user
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    },
    async trashUser({ commit, getters }, user) {
      await axios.post(`${process.env.VUE_APP_API}/users/${user.id}`, {
        _method: 'DELETE'
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    },
    async fetchClassificators({ commit, getters }) {
      await axios.get(`${process.env.VUE_APP_API}/classificators`, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
        .then(res => {
          commit('setClassificators', res.data.classificators)
        })
    },
    async saveClassificator({ commit, getters }, data) {
      await axios.post(`${process.env.VUE_APP_API}/classificators/${data.class}`, {
        ...data,
        _method: 'PATCH'
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    },
    async addClassificator({ commit, getters }, data) {
      await axios.post(`${process.env.VUE_APP_API}/classificators`, {
        ...data
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    },
    async trashClassificator({ commit, getters }, data) {
      await axios.post(`${process.env.VUE_APP_API}/classificators/${data.class}`, {
        _method: 'DELETE'
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    },
    async changeOperatorForOrder({ commit, getters }, { order, operator }) {
      await axios.post(`${process.env.VUE_APP_API}/orders/${order.id}/operator`, {
        _method: 'PATCH',
        operator_id: operator.id
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    },
    async changeClassificator({ commit, getters }, { order, classificator }) {
      await axios.post(`${process.env.VUE_APP_API}/orders/${order.id}/classificator`, {
        _method: 'PATCH',
        classificator_id: classificator.id
      }, {
        headers: {
          Authorization: `Bearer ${getters.info.api_token}`
        }
      })
    }
  },
  getters: {
    info: (s) => s.info,
    roles: (s) => s.roles,
    organizations: (s) => s.organizations,
    classificators: (s) => s.classificators,
    tenants: (s) => s.tenants,
    operators: (s) => s.operators,
    operatorsForChange: (s) => s.operatorsForChange
  },
  modules: {
    Popup,
    Toast,
    Orders
  }
})
