export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(html) {
      this.$store.commit('openToast', html)
    }
  }
}
