import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VuePageTransition from 'vue-page-transition'
import Transitions from 'vue2-transitions'
import PortalVue from 'portal-vue'
import 'jquery-ui-dist/jquery-ui'
import VueMask from 'v-mask'
import MessagePlugin from '@/utils/message.plugin'
import Vuelidate from 'vuelidate'
import axios from 'axios'

// import 'materialize-css/dist/js/materialize.min'
import 'vue-simple-accordion/dist/vue-simple-accordion.css'

Vue.config.productionTip = false

Vue.use(MessagePlugin)
Vue.use(VuePageTransition)
Vue.use(Transitions)
Vue.use(PortalVue)
Vue.use(VueMask)
Vue.use(Vuelidate)

if (localStorage.getItem('user')) {
  const user = JSON.parse(localStorage.getItem('user'))
  axios.get(`${process.env.VUE_APP_API}/profile`, {
    headers: {
      Authorization: `Bearer ${user.api_token}`
    }
  })
    .then(res => {
      store.state.info = res.data.user
      initVue()
    })
    .catch(() => {
      localStorage.removeItem('user')
      initVue()
    })
} else {
  initVue()
}

function initVue() {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}
