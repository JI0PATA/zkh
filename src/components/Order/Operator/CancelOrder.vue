<template>
  <div class="order-cancel-container">
    <div class="order-cancel--close" @click="$emit('closeTabCancel', false)">
      <img src="@/assets/img/icons/u_close.svg" alt="Close">
    </div>
    <div class="card-line"></div>
    <div class="order-title">Отклонение заявки</div>
    <textarea class="input-textarea order-cancel--textarea"
              v-model="cancelComment"
              placeholder="Опишите причину отклонения"></textarea>
    <div class="order-cancel--buttons">
      <div class="order-cancel--checkbox">
        <Checkbox :checked="wasCall"
                  @change="handleWasCall" />
        <span>Был совершен звонок жильцу</span>
      </div>
      <button class="input-btn order-btn"
              @click.prevent="cancelOrderHandle"
              :class="{disabled: checkDisableButtonCancelOrder}">Отклонить</button>
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/app/Form/Checkbox'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  props: ['order'],
  name: 'CancelOrder',
  data: () => ({
    cancelComment: '',
    wasCall: true
  }),
  validations: {
    cancelComment: { required }
  },
  methods: {
    ...mapActions(['fetchOrders', 'cancelOrder']),
    async cancelOrderHandle() {
      if (this.checkDisableButtonCancelOrder) return

      await this.cancelOrder({
        message: this.cancelComment,
        wasCall: this.wasCall,
        order: this.order
      })
      this.fetchOrders(0)
    },
    handleWasCall(val) {
      this.wasCall = val
    }
  },
  computed: {
    checkDisableButtonCancelOrder() {
      return !this.$v.cancelComment.required
    }
  },
  components: {
    Checkbox
  }
}
</script>
