<template>
  <div>
    <div class="order-status-container order-status-container--operator">
      <div class="order-status--progress">
        <div class="order-status--progress-title">Часов на выбор специалиста</div>
        <div class="order-status--progress-status">
          <input type="text"
                 v-model="hourForSelect"
                 class="input-field order-status--progress-input">
          <button
            :class="{disabled: checkDisableButtonAcceptOrder}"
            @click="acceptOrderHandle"
            class="input-btn order-btn order-btn--margin-24">Принять заявку</button>
          <button
            @click="changeTabCancel(true)"
            class="input-btn input-btn-white order-btn order-btn--margin-8">Отклонить</button>
        </div>
      </div>
      <div class="order-status--right-block">
        <div class="order-status--progress">
          <div class="order-status--progress-title">До рассмотрения осталось</div>
          <div class="order-status--progress-status">
            <img src="@/assets/img/icons/u_clock-ten.svg" alt="Clock">
            <span class="order-status--progress-status-title">{{ timeForAcceptOperator | orderTimeFilter }}</span>
          </div>
        </div>
      </div>
    </div>

    <slide-y-up-transition>
      <CancelOrder
        :order="order"
        @closeTabCancel="changeTabCancel"
        v-show="isOpenCancel" />
    </slide-y-up-transition>
  </div>
</template>

<script>
import CancelOrder from '@/components/Order/Operator/CancelOrder'
import { required } from 'vuelidate/lib/validators'
import orderTimeFilter from '@/filters/orderTime.filter'
import { mapActions } from 'vuex'

export default {
  props: ['order'],
  name: 'FirstStep',
  data: () => ({
    isOpenCancel: false,
    hourForSelect: 1
  }),
  filters: {
    orderTimeFilter
  },
  validations: {
    hourForSelect: { required }
  },
  computed: {
    checkDisableButtonAcceptOrder() {
      return !this.$v.hourForSelect.required
    },
    timeForAcceptOperator() {
      const timeCreatedAt = new Date(this.order.created_at).getTime() / 1000
      const now = new Date().getTime() / 1000
      return timeCreatedAt - now + this.convertHoursToSeconds(this.order.classificator.time)
    }
  },
  methods: {
    ...mapActions(['setFirstStep', 'fetchOrders']),
    changeTabCancel(val) {
      this.isOpenCancel = val
    },
    convertHoursToSeconds(hours) {
      return hours * 60 * 60
    },
    async acceptOrderHandle() {
      if (this.checkDisableButtonAcceptOrder) return

      await this.setFirstStep({
        hourForSelect: this.hourForSelect,
        order: this.order
      })
      await this.fetchOrders(0)
      this.$toast('Статус заявки изменён<br>на Поиск специалиста')
    }
  },
  components: {
    CancelOrder
  }
}
</script>
