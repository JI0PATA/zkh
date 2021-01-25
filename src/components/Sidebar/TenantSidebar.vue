<template>
  <div class="sidebar-panel">
    <div class="sidebar">
      <div class="sidebar-title">Настройки</div>
      <div class="sidebar-setting">
        <Checkbox :checked="info.notification" @change="toggleNotification" />
        <span>Уведомлять меня об этапах рассмотрения заявок по SMS</span>
      </div>
      <div class="card-line"></div>

      <div class="faq">
        <div class="sidebar-title">Вопросы и ответы</div>
        <div class="sidebar-description">Ответы на самые популярные вопросы</div>

        <div class="faq-list">
          <h3 class="faq-title-container">
            <span class="faq-title">Для чего мне самому оставлять заявки?</span>
            <span class="faq-arrow"><img src="@/assets/img/icons/fi_chevron-down.svg" alt="Arrow"></span>
          </h3>
          <div class="faq-description">
            Заявки нужно оставлять, чтобы разгрузить систему менеджеров, так менежер быстрее сможет обработать ваш
            запрос и решить проблему в кратчайшие сроки, потому что каждый этап заявки ограничен временем
          </div>
        </div>
        <div class="card-line"></div>
        <div class="faq-list">
          <h3 class="faq-title-container">
            <span class="faq-title">О каких проблемах мне можно писать?</span>
            <span class="faq-arrow"><img src="@/assets/img/icons/fi_chevron-down.svg" alt="Arrow"></span>
          </h3>
          <div class="faq-description">
            О всех проблемах, связанных с ЖКХ: Утечкой воды, проблемами с напомром, всё, что связано с уборкой подъездов
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar sidebar-popup">
      <div class="sidebar-title">Техподдержка</div>
      <div class="sidebar-description">Если вы хотите оставить отзыв, предложение<br>или у вас появились вопросы</div>
      <button @click.prevent="openSupportPopup" class="input-btn input-btn-white sidebar-btn">Задать вопрос</button>
      <img src="@/assets/img/headphones.svg" alt="Headphones" class="sidebar-popup-img">
    </div>
    <div class="sidebar sidebar-popup">
      <div class="sidebar-title">Запрос документов</div>
      <div class="sidebar-description">Если вам понадобились<br>документы, справки, сведения</div>
      <button @click.prevent="openRequestPopup" class="input-btn input-btn-white sidebar-btn">Запросить документы</button>
      <img src="@/assets/img/et_document.svg" alt="Document" class="sidebar-popup-img">
    </div>

    <portal to="popup">
      <fade-transition>
        <Popup @close="closePopup" v-if="getSupportPopup">
          <div class="popup-title">Обратная связь</div>
          <div class="popup-description">Мы ответим на все ваши вопросы, а также готовы услышать<br>ваши отзывы и предложения</div>
          <textarea class="input-textarea"
                    v-model="feedbackText"
                    placeholder="Опишите вашу обратную связь"></textarea>
          <button class="input-btn input-btn-small" :class="{disabled: checkDisabledButtonFeedback}">Отправить</button>
        </Popup>
      </fade-transition>

      <fade-transition>
        <Popup @close="closePopup" v-if="getRequestPopup">
          <div class="popup-title">Запрос документов</div>
          <div class="popup-description">Если вам понадобились документы, справки, сведения,<br>опишите причину запроса и выберите тип необходимого документа</div>
          <textarea style="height:72px"
                    class="input-textarea"
                    v-model="requestText"
                    placeholder="Опишите вид документа"></textarea>
          <button class="input-btn input-btn-small" :class="{disabled: checkDisabledButtonRequest}">Отправить</button>
        </Popup>
      </fade-transition>

      <fade-transition>
        <Popup @close="closePopup" v-if="getCallbackPopup">
          <div class="popup-title">Заказать звонок</div>
          <div class="popup-description">Если у вас появились вопросы, вы можете заказать звонок<br>и наш менеджер перезвонит вам в ближайшее время</div>
          <div class="input-row">
            <span class="input-title">Номер телефона</span>
            <phone-mask-input
              :value="info.phone"
              v-model="callbackText"
              wrapperClass="input-field-mask-wrapper"
              inputClass="input-field input-field-mask"
              placeholder="+7 (000) 000-00-00"/>
            <span class="input-error">Телефон не должен быть пустым</span>
          </div>
          <button class="input-btn input-btn-small" :class="{disabled: checkDisabledButtonCallback}">Отправить</button>
        </Popup>
      </fade-transition>
    </portal>
  </div>
</template>

<script>
import $ from 'jquery'
import 'jquery-ui'
import Popup from '@/components/app/Popup'
import { mapActions, mapGetters } from 'vuex'
import PhoneMaskInput from 'vue-phone-mask-input'
import Checkbox from '@/components/app/Form/Checkbox'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'TenantSidebar',
  data: () => ({
    popup: false,
    feedbackText: '',
    requestText: '',
    callbackText: ''
  }),
  validations: {
    feedbackText: { required },
    requestText: { required },
    callbackText: { required }
  },
  computed: {
    ...mapGetters(['info', 'getCallbackPopup', 'getSupportPopup', 'getRequestPopup']),
    checkDisabledButtonFeedback() {
      return !this.$v.feedbackText.required
    },
    checkDisabledButtonRequest() {
      return !this.$v.requestText.required
    },
    checkDisabledButtonCallback() {
      return !this.$v.callbackText.required
    }
  },
  methods: {
    ...mapActions(['openSupportPopup', 'openRequestPopup', 'closePopup', 'toggleNotification', 'sendPopup']),
    sendFeedbackText() {
      this.sendPopup({
        message: this.feedbackText,
        type: 0
      })
    },
    sendRequestText() {
      this.sendPopup({
        message: this.requestText,
        type: 1
      })
    },
    sendCallbackText() {
      this.sendPopup({
        message: this.callbackText,
        type: 2
      })
    }
  },
  mounted() {
    $('.faq-list').accordion({
      heightStyle: 'content',
      icons: false,
      active: 2,
      collapsible: true
    })
    this.callbackText = this.info.phone
  },
  components: {
    Popup,
    PhoneMaskInput,
    Checkbox
  }
}
</script>
