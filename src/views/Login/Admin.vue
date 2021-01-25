<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent>
      <img src="@/assets/img/logo/login_admin.png" alt="Logo">

      <div class="input-column">
        <div class="input-row">
          <span class="input-title">Логин</span>
          <input type="text" placeholder="username"
                 v-model="login"
                 class="input-field">
          <span class="input-error">Логин не должен быть пустым</span>
        </div>

        <div class="input-row">
          <span class="input-title">Пароль</span>
          <input type="password" placeholder="Введите пароль"
                 v-model="password"
                 class="input-field">
          <span class="input-error">Пароль не должен быть пустым</span>
        </div>
      </div>

      <button class="input-btn" @click="loginHandle" :class="{disabled: checkDisableButton}">Войти</button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'LoginAdmin',
  data: () => ({
    login: '',
    password: ''
  }),
  validations: {
    login: { required },
    password: { required }
  },
  methods: {
    ...mapMutations(['setInfo']),
    async loginHandle() {
      if (this.checkDisabledButton) return

      await axios.post(`${process.env.VUE_APP_API}/login`, {
        login: this.login,
        password: this.password,
        role: 3
      })
        .then(res => {
          const data = res.data
          if (data.status) {
            this.setInfo(data.user)
            this.$toast('Вы авторизованы')
            this.$router.push({ name: 'Home' })
          }
        })
        .catch(() => {
          this.$toast('Неверные данные')
        })
    }
  },
  computed: {
    checkDisableButton() {
      return !this.$v.login.required || !this.$v.password.required
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  background: #646464;
}

.input-btn {
  margin-top: 30px;
}
</style>
