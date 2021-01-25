<template>
  <div class="recovery">
    <form class="recovery-form success" @submit.prevent>
      <a href="#" @click.prevent="$router.go(-1)" class="recovery-back">
        <img src="@/assets/img/icons/fi_arrow-left.svg" alt="Arrow left" class="recovery-back-icon">
        <span class="recovery-back-title">Вернуться назад</span>
      </a>
      <img src="@/assets/img/logo/logo.png" alt="Logo">

      <template v-show="!isSuccess">
        <div class="recovery-title">
          Мы отправим на ваш телефон,<br>код для смены пароля
        </div>

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
        </div>

        <button class="input-btn"
                @click.prevent="recovery"
                :class="{disabled: checkRecoveryButton}">Получить новый пароль</button>
      </template>
      <template v-show="isSuccess">
        <div class="recovery-title">
          Мы отправили новый пароль на <strong>{{ phone | phoneFilter }}</strong>
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
import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'
import phoneFilter from '@/filters/phone.filter'

export default {
  name: 'RecoveryPasswordEmail',
  data: () => ({
    phone: '',
    isSuccess: false
  }),
  filters: {
    phoneFilter
  },
  validations: {
    phone: { required, minLength: minLength(12) }
  },
  methods: {
    recovery() {
      axios.post(`${process.env.VUE_APP_API}/recovery/phone`, {
        phone: this.phone
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
    checkRecoveryButton() {
      return !this.$v.phone.required || !this.$v.phone.minLength
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
