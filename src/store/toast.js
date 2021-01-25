export default {
  state: {
    toast: false,
    caption: 'Ваша заявка добавлена'
  },
  mutations: {
    openToast(state, html) {
      state.toast = true
      state.caption = html

      setTimeout(_ => {
        state.toast = false
      }, 4000)
    },
    closeToast(state) {
      state.toast = false
    }
  },
  getters: {
    toast: (s) => s.toast,
    caption: (s) => s.caption
  }
}
