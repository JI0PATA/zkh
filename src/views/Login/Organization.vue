<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent>
      <img src="@/assets/img/logo/login_organization.png" alt="Logo">

      <div class="input-column">
        <div class="input-row">
          <span class="input-title">Email</span>
          <input type="text"
                 placeholder="username@gmail.com"
                 v-model="email"
                 class="input-field">
          <span class="input-error">Email не должен быть пустым</span>
        </div>

        <div class="input-row">
          <span class="input-title">Пароль</span>
          <input type="password"
                 placeholder="Введите пароль"
                 v-model="password"
                 class="input-field">
          <span class="input-error">Пароль не должен быть пустым</span>
        </div>
      </div>

      <router-link :to="{ name: 'RecoveryEmail' }" class="input-forgot-password">Забыли пароль?</router-link>

      <button class="input-btn"
              @click="loginHandle"
              :class="{disabled: checkDisableButton}">Войти</button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'LoginOrganization',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { required },
    password: { required }
  },
  methods: {
    ...mapMutations(['setInfo']),
    async loginHandle() {
      if (this.checkDisabledButton) return

      await axios.post(`${process.env.VUE_APP_API}/login`, {
        email: this.email,
        password: this.password,
        role: 2
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
      return !this.$v.email.required || !this.$v.password.required
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/_vars.scss";

  .login-page {
    background: $primary;
  }
  .input-btn {
    margin-top: 40px;
  }
</style>
