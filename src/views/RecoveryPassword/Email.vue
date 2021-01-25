<template>
  <div class="recovery">
    <form class="recovery-form success" @submit.prevent>
      <a href="#" @click.prevent="$router.go(-1)" class="recovery-back">
        <img src="@/assets/img/icons/fi_arrow-left.svg" alt="Arrow left" class="recovery-back-icon">
        <span class="recovery-back-title">Вернуться назад</span>
      </a>
      <img src="@/assets/img/logo/logo.png" alt="Logo">

      <template v-if="!isSuccess">
        <div class="recovery-title">
          Мы отправим на email,<br>новый пароль
        </div>
        <div class="input-column">
          <div class="input-row">
            <span class="input-title">Email</span>
            <input type="email" v-model="email" placeholder="Введите email" class="input-field">
            <span class="input-error">Email не должен быть пустым</span>
          </div>
        </div>
        <button :class="{disabled: checkDisabledButton}"
                @click.prevent="recoveryHandle"
                class="input-btn">Получить новый пароль</button>
      </template>
      <template v-if="isSuccess">
        <div class="recovery-title">
          Мы отправили новый пароль на ваш email
        </div>
        <img src="@/assets/img/icons/check_recovery.svg" alt="Check" class="recovery-check">
        <router-link :to="{name: 'LoginTenant'}" class="block">
          <button class="input-btn input-btn--to-login">Вернуться ко входу</button>
        </router-link>
      </template>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'RecoveryPasswordEmail',
  data: () => ({
    email: '',
    isSuccess: false
  }),
  validations: {
    email: { required }
  },
  methods: {
    recoveryHandle() {
      if (this.checkDisabledButton) return

      axios.post(`${process.env.VUE_APP_API}/recovery/email`, {
        email: this.email
      })
        .then(res => {
          if (res.data.status) this.isSuccess = true
          else {
            this.$toast('Неверные данные')
          }
        })
    }
  },
  computed: {
    checkDisabledButton() {
      return !this.$v.email.required
    }
  }
}
</script>

<style lang="scss">
  .input-btn {
    margin-top: 40px;
  }
  .input-btn--to-login {
    margin-top: 72px;
  }

  .recovery-form.success {
    padding-bottom: 70px;
  }
</style>
