<template>
  <div class="order-progress-container">
    <div class="card-line"></div>
    <div class="order-progress-list">
      <div class="order-progress-item" v-if="order.status >= 0">
        <div class="order-progress-item-step complete">
          <span v-show="false">1</span>
          <img src="@/assets/img/icons/u_check.svg" alt="Check">
        </div>
        <div class="order-progress-item-info">
          <div class="order-progress-item-title">Заявка отправлена</div>
          <div class="order-progress-item-description">Оператор выбирает специалиста</div>
        </div>
        <div class="order-progress-item-time" v-show="false">
          <img src="@/assets/img/icons/u_clock-ten-gray.svg" alt="Clock">
          <span class="order-progress-item-time-text">50 мин.</span>
        </div>
      </div>
      <template v-if="order.status >= 0">
        <div class="order-progress-line">
          <img src="@/assets/img/icons/progress_line.svg" alt="Line">
        </div>
        <div class="order-progress-item">
          <div class="order-progress-item-step" :class="{complete: order.status > 0}">
            <span v-show="order.status === 0">2</span>
            <img src="@/assets/img/icons/u_check.svg" alt="Check" v-show="order.status > 0">
          </div>
          <div class="order-progress-item-info">
            <div class="order-progress-item-title">Заявка принята оператором</div>
            <div class="order-progress-item-description">В стадии направления специалисту</div>
          </div>
          <div class="order-progress-item-time" v-show="order.status < 1">
            <img src="@/assets/img/icons/u_clock-ten-gray.svg" alt="Clock">
            <span class="order-progress-item-time-text">{{ timeForAcceptOperator | orderTimeFilter }}</span>
          </div>
        </div>
      </template>
      <template v-if="order.status >= 1">
        <div class="order-progress-line">
          <img src="@/assets/img/icons/progress_line.svg" alt="Line">
        </div>
        <div class="order-progress-item">
          <div class="order-progress-item-step" :class="{complete: order.status >= 2}">
            <span v-show="order.status === 1">3</span>
            <img src="@/assets/img/icons/u_check.svg" alt="Check" v-show="order.status >= 2">
          </div>
          <div class="order-progress-item-info">
            <div class="order-progress-item-title">Специалист направлен</div>
            <div class="order-progress-item-description">В назначенную дату специлист направлен</div>
          </div>
          <div class="order-progress-item-time" v-show="order.status === 1">
            <img src="@/assets/img/icons/u_clock-ten-gray.svg" alt="Clock">
            <span class="order-progress-item-time-text">{{ timeForSelectSpecialist | orderTimeFilter }}</span>
          </div>
        </div>
      </template>
      <template v-if="order.status >= 2">
        <div class="order-progress-line">
          <img src="@/assets/img/icons/progress_line.svg" alt="Line">
        </div>
        <div class="order-progress-item">
          <div class="order-progress-item-step" :class="{complete: order.status >= 3}">
            <span v-show="order.status === 2">4</span>
            <img src="@/assets/img/icons/u_check.svg" alt="Check" v-show="order.status >= 3">
          </div>
          <div class="order-progress-item-info">
            <div class="order-progress-item-title">Заявка выполнена</div>
            <div class="order-progress-item-description">Оставьте отзыв о качестве выполнения</div>
          </div>
          <div class="order-progress-item-time" v-if="order.status !== 3">
            <img src="@/assets/img/icons/u_clock-ten-gray.svg" alt="Clock">
            <span class="order-progress-item-time-text">{{ timeForArriveSpecialist | orderTimeFilter }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import orderTimeFilter from '@/filters/orderTime.filter'
export default {
  name: 'OrderProgress',
  props: ['order'],
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
    convertHoursToSeconds(hours) {
      return hours * 60 * 60
    }
  }
}
</script>
