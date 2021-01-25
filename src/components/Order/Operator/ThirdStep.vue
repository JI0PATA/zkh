<template>
  <div>
    <div class="order-status-container order-status-container--operator">
      <div class="order-status--progress">
        <div class="order-status--progress-status">
          <button
            @click="handleStep"
            class="input-btn order-btn">Работа выполнена</button>
        </div>
      </div>
      <div class="order-status--right-block">
        <div class="order-status--progress">
          <div class="order-status--progress-title">Осталось до завершения работы специалиста</div>
          <div class="order-status--progress-status">
            <img src="@/assets/img/icons/u_clock-ten.svg" alt="Clock">
            <span class="order-status--progress-status-title">{{ timeForArriveSpecialist | orderTimeFilter }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderTimeFilter from '@/filters/orderTime.filter'
import { mapActions } from 'vuex'
export default {
  props: ['order'],
  name: 'ThirdStep',
  filters: {
    orderTimeFilter
  },
  methods: {
    ...mapActions(['fetchOrders', 'setThirdStep']),
    async handleStep() {
      await this.setThirdStep(this.order)
      await this.fetchOrders(2)
    }
  },
  computed: {
    timeForArriveSpecialist() {
      const now = new Date().getTime() / 1000
      return new Date(this.order.specialist_arrive_at).getTime() / 1000 - now
    }
  }
}
</script>
