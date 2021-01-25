<template>
  <div class="operator-request">
    <h1 class="page-title">Добавить заявку</h1>

    <div class="container-with-sidebar">
      <div class="container-main">
        <div class="request-container">
          <h2 class="request-title">Что у вас случилось?</h2>
          <textarea placeholder="Опишите вашу проблему подробно,
для наглядности приложите фотографию"
                    v-model="message"
                    class="input-textarea request-textarea"
          ></textarea>
          <div class="request-additional-info">
            <DateTime @changeDate="handleDate" @changeTime="handleTime" :key="isClear" />

            <div class="request-additional-info--right">
              <button class="z-btn request-btn" @click="sendRequest" :class="{disabled: checkSendButton}">Оставить заявку</button>
            </div>
          </div>
        </div>
      </div>

      <Sidebar :tab="'request'" />
    </div>
  </div>
</template>

<script>
import DateTime from '@/components/app/DateTime'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import Sidebar from '@/components/Sidebar/OperatorSidebar'

export default {
  name: 'TenantRequest',
  data: () => ({
    message: '',
    date: '',
    time: '',
    isClear: new Date().getMilliseconds()
  }),
  methods: {
    ...mapActions(['fetchOrdersForTenant']),
    handleDate(date) {
      this.date = date
    },
    handleTime(time) {
      this.time = time
    },
    async sendRequest() {
      if (this.checkSendButton) return

      const fd = new FormData()
      fd.append('message', this.message)
      fd.append('visit_at', `${this.date ? this.date.toISOString().split('T')[0] : ''} ${this.time}`)

      await axios.post(`${process.env.VUE_APP_API}/orders`, fd, {
        headers: {
          Authorization: `Bearer ${this.info.api_token}`
        }
      })
        .then(res => {
          this.$toast('Ваша заявка успешно отправлена!')
          this.message = ''
          this.isClear = new Date().getMilliseconds()
          this.fetchOrdersForTenant(0)
        })
    }
  },
  validations: {
    message: { required }
  },
  computed: {
    ...mapGetters(['info']),
    checkSendButton() {
      return !this.$v.message.required
    }
  },
  components: {
    DateTime,
    Sidebar
  }
}
</script>

<style lang="scss">

</style>
