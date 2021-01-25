<template>
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
        <label class="request-photo-container">
          <span class="request-photo-title">Прикрепить фото</span>
          <img src="@/assets/img/icons/u_upload.svg" alt="Upload">
          <input type="file" ref="photos" @change="handlePhotos" multiple style="display: none;">
        </label>
        <button class="z-btn request-btn" @click="sendRequest" :class="{disabled: checkSendButton}">Оставить заявку</button>
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from '@/components/app/DateTime'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TenantRequest',
  data: () => ({
    message: '',
    date: '',
    time: '',
    photos: [],
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
    handlePhotos() {
      if (this.$refs.photos.files.length > process.env.VUE_APP_MAX_PHOTO_COUNT) {
        this.$toast(`Не более ${process.env.VUE_APP_MAX_PHOTO_COUNT} файлов`)
        this.$refs.photos.value = ''
      }
      this.$refs.photos.forEach(file => {
        if (file.size / 1000 > process.env.VUE_APP_MAX_PHOTO_SIZE) {
          this.$toast(`Размер файлов не должен быть более ${process.env.VUE_APP_MAX_PHOTO_SIZE / 1000}Мб`)
          this.$refs.photos.value = ''
        }
      })
      /* const photos = []
      for (let i = 0; i < this.$refs.photos.files.length; i++) {
        photos.push(this.$refs.photos.files[i])
      } */
      this.photos = this.$refs.photos.files
      this.$toast('Файлы загружены')
    },
    async sendRequest() {
      if (this.checkSendButton) return

      const fd = new FormData()
      fd.append('message', this.message)
      fd.append('visit_at', `${this.date ? this.date.toISOString().split('T')[0] : ''} ${this.time}`)
      this.$refs.photos.files.forEach(file => {
        fd.append('photos[]', file)
      })

      await axios.post(`${process.env.VUE_APP_API}/orders`, fd, {
        headers: {
          Authorization: `Bearer ${this.info.api_token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          this.$toast('Ваша заявка успешно отправлена!')
          this.message = ''
          this.$refs.photos.files.value = ''
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
    DateTime
  }
}
</script>

<style lang="scss">

</style>
