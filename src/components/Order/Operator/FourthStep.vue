<template>
  <div>
    <div class="order-status-container order-status-container--operator">
      <div class="order-status--progress">
        <div class="order-status--progress-status">
          <button
            @click="handleReturn"
            class="input-btn input-btn-white order-btn">Вернуть заявку</button>
        </div>
      </div>
      <div class="order-status--right-block">
        <div class="order-status--progress">
          <div class="order-status--progress-title">Отзыв о выполнении работ</div>
          <div class="order-status--progress-status">
            <div class="order-rate-caption" v-if="!order.rate">Отзыва пока нет</div>
            <div class="order-rate-list" v-else>
              <img src="@/assets/img/icons/u_favorite.svg" alt="Star"
                   v-for="i in order.rate"
                   :key="`rate${i}`">
              <img src="@/assets/img/icons/u_favorite-empty.svg" alt="Star empty"
                   v-for="i in 5 - order.rate"
                   :key="`empty${i}`">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['order'],
  name: 'FourthStep',
  methods: {
    ...mapActions(['fetchOrders', 'orderReturn']),
    async handleReturn() {
      await this.orderReturn(this.order)
      this.fetchOrders(3)
    }
  }
}
</script>
