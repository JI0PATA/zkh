<template>
  <div class="order-status-container">
    <div class="order-status--progress">
      <div class="order-status--progress-title">Статус выполнения</div>
      <div class="order-status--progress-status">
        <img src="@/assets/img/icons/fi_loader.svg" alt="Loader" v-if="order.status !== 3">
        <img src="@/assets/img/icons/fi_check-white.svg" alt="Check" v-else>
        <span class="order-status--progress-status-title" v-if="order.status === 0">Заявка отправлена</span>
        <span class="order-status--progress-status-title" v-if="order.status === 1">Заявка принята оператором</span>
        <span class="order-status--progress-status-title" v-if="order.status === 2">Специалист направлен</span>
        <span class="order-status--progress-status-title" v-if="order.status === 3">Заявка выполнена</span>
      </div>
    </div>
    <div class="order-status--right-block">
      <div class="order-status--progress">
        <div class="order-status--progress-title" v-if="order.status === 0">До принятия оператором</div>
        <div class="order-status--progress-title" v-if="order.status === 1">До направления специалиста</div>
        <div class="order-status--progress-title" v-if="order.status === 2">До выполнения заявки</div>
        <div class="order-status--progress-title" v-if="order.status === 3">Оставьте отзыв о выполнении работ</div>
        <div class="order-status--progress-status">
          <img src="@/assets/img/icons/u_clock-ten.svg" alt="Clock" v-if="order.status !== 3">
          <span class="order-status--progress-status-title" v-if="order.status === 0">{{ timeForAcceptOperator | orderTimeFilter }}</span>
          <span class="order-status--progress-status-title" v-if="order.status === 1">{{ timeForSelectSpecialist | orderTimeFilter }}</span>
          <span class="order-status--progress-status-title" v-if="order.status === 2">{{ timeForArriveSpecialist | orderTimeFilter }}</span>
          <div class="order-rate" v-show="order.status === 3">
            <div v-for="i in 5" :key="i">
              <img src="@/assets/img/icons/u_favorite-green.svg"
                   alt="Favorite"
                   @mouseover="handleRate(i)"
                   @mouseout="rateCount = defaultRate"
                   @click="rate(i)"
                   v-show="rateCount >= i">
              <img src="@/assets/img/icons/u_favorite-empty.svg"
                   alt="Favorite"
                   @mouseover="handleRate(i)"
                   @mouseout="rateCount = defaultRate"
                   v-show="rateCount < i">
            </div>
          </div>
        </div>
      </div>
      <div class="order-status--uncover" @click="changeTabProgress">
        <img src="@/assets/img/icons/fi_chevron-down.svg" alt="Down arrow" :class="{active: isOpenProgress}">
      </div>
    </div>
  </div>
</template>

<script>
import orderTimeFilter from '@/filters/orderTime.filter'
import { mapActions } from 'vuex'

export default {
  name: 'OrderStatus',
  props: ['order'],
  data: () => ({
    isOpenProgress: false,
    rateCount: 0,
    defaultRate: 0
  }),
  filters: {
    orderTimeFilter
  },
  computed: {
    timeForAcceptOperator() {
      const timeCreatedAt = new Date(this.order.created_at).getTime() / 1000
      const now = new Date().getTime() / 1000
      return timeCreatedAt - now + this.convertHoursToSeconds(this.order.classificator.time)
    },
    timeForSelectSpecialist() {
      const timeUpdatedAt = new Date(this.order.updated_at).getTime() / 1000
      const now = new Date().getTime() / 1000
      return timeUpdatedAt - now + this.convertHoursToSeconds(this.order.hour_for_select)
    },
    timeForArriveSpecialist() {
      const now = new Date().getTime() / 1000
      return new Date(this.order.specialist_arrive_at).getTime() / 1000 - now
    }
  },
  methods: {
    ...mapActions(['orderRate', 'fetchOrdersForTenant']),
    changeTabProgress() {
      this.isOpenProgress = !this.isOpenProgress
      this.$emit('changeProgress', this.isOpenProgress)
    },
    convertHoursToSeconds(hours) {
      return hours * 60 * 60
    },
    handleRate(val) {
      this.rateCount = val
    },
    async rate(val) {
      this.defaultRate = val
      await this.orderRate({ order: this.order, rate: val })
    }
  },
  mounted() {
    this.defaultRate = this.order.rate
    this.rateCount = this.defaultRate
  }
}
</script>
