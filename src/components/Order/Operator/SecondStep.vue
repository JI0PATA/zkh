<template>
  <div>
    <div class="order-status-container order-status-container--operator">
      <div class="order-status--progress">
        <div class="order-status--progress-title">Специалист прибудет</div>
        <div class="order-status--progress-status">
          <DateTime @changeDate="handleDate" @changeTime="handleTime" />
          <button
            :class="{disabled: checkDisabledSearchButton}"
            @click="handleSpecialist"
            class="input-btn order-btn order-btn--margin-24">Специалист направлен</button>
        </div>
      </div>
      <div class="order-status--right-block">
        <div class="order-status--progress">
          <div class="order-status--progress-title">Осталось до выбора специалиста</div>
          <div class="order-status--progress-status">
            <img src="@/assets/img/icons/u_clock-ten.svg" alt="Clock">
            <span class="order-status--progress-status-title">{{ timeForSelectSpecialist | orderTimeFilter }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from '@/components/app/DateTime'
import orderTimeFilter from '@/filters/orderTime.filter'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  props: ['order'],
  name: 'SecondStep',
  data: () => ({
    date: '',
    time: ''
  }),
  validations: {
    date: { required },
    time: { required, minLength: minLength(5) }
  },
  components: {
    DateTime
  },
  filters: {
    orderTimeFilter
  },
  computed: {
    checkDisabledSearchButton() {
      return !this.$v.date.required || (!this.$v.time.required || !this.$v.time.minLength)
    },
    timeForSelectSpecialist() {
      const timeUpdatedAt = new Date(this.order.updated_at).getTime() / 1000
      const now = new Date().getTime() / 1000
      return timeUpdatedAt - now + this.convertHoursToSeconds(this.order.hour_for_select)
    }
  },
  methods: {
    ...mapActions(['fetchOrders', 'setSecondStep']),
    convertHoursToSeconds(hours) {
      return hours * 60 * 60
    },
    handleDate(val) {
      this.date = val
    },
    handleTime(val) {
      this.time = val
    },
    async handleSpecialist() {
      await this.setSecondStep({
        dateTime: `${this.date ? this.date.toISOString().split('T')[0] : ''} ${this.time}`,
        order: this.order
      })
      await this.fetchOrders(1)
      this.$toast('Статус заявки изменён<br>на Специалист направлен')
    }
  }
}
</script>

<style lang="scss" scoped>
.request-datetime-container {
  height: 32px;
}
</style>
