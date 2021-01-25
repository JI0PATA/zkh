<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent="login">
      <img src="@/assets/img/logo/login_operator.png" alt="Logo">

      <div class="input-column">
        <div class="input-row">
          <span class="input-title">Номер телефона</span>
          <phone-mask-input
            v-model="phone"
            wrapperClass="input-field-mask-wrapper"
            inputClass="input-field input-field-mask"
            placeholder="+7 (000) 000-00-00"/>
          <span class="input-error">Телефон не должен быть пустым</span>
        </div>

        <div class="input-row">
          <span class="input-title">Пароль</span>
          <input type="password"
                 v-model="password"
                 placeholder="Введите пароль" class="input-field">
          <span class="input-error">Пароль не должен быть пустым</span>
        </div>
      </div>

      <router-link :to="{ name: 'RecoveryPhone' }" class="input-forgot-password">Забыли пароль?</router-link>

      <button class="input-btn" :class="{disabled: checkDisabledButton}">Войти</button>
    </form>
  </div>
</template>

<script>
import PhoneMaskInput from 'vue-phone-mask-input'
import { required, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginOperator',
  data: () => ({
    phone: '',
    password: ''
  }),
  validations: {
    phone: { required, minLength: minLength(12) },
    password: { required }
  },
  methods: {
    ...mapMutations(['setInfo']),
    async login() {
      if (this.checkDisabledButton) return

      await axios.post(`${process.env.VUE_APP_API}/login`, {
        phone: this.phone,
        password: this.password,
        role: 1
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
    checkDisabledButton() {
      return (!this.$v.phone.required || !this.$v.phone.minLength) || !this.$v.password.required
    }
  },
  components: {
    PhoneMaskInput
  }
}
</script>

<style lang="scss">
  .login-page {
    background: #EAEAEE;
  }
  .input-btn {
    margin-top: 40px;
  }
</style>
