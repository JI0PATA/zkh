import routes from '@/router/routes'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import store from '@/store'

Vue.use(VueRouter)
Vue.use(Vuelidate)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth !== false &&
      Object.keys(store.getters.info).length === 0) {
    return next({ name: 'LoginTenant' })
  }
  if (to.meta.role && to.meta.role !== store.getters.info.role) {
    return next({ name: 'LoginTenant' })
  }
  if (to.meta.auth === false && Object.keys(store.getters.info).length !== 0) {
    return next({ name: 'Home' })
  }
  next()
})

export default router
