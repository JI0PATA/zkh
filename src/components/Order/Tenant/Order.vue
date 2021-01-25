<template>
  <Order :order="order">
    <OrderStatus :order="order" @changeProgress="changeProgress" />
    <slide-y-up-transition>
      <OrderProgress :order="order" v-show="isOpenProgress" />
    </slide-y-up-transition>
  </Order>
</template>

<script>
import Order from '@/components/Order/Order'
import OrderStatus from '@/components/Order/Tenant/Status'
import OrderProgress from '@/components/Order/Tenant/Progress'

export default {
  props: ['order'],
  data: () => ({
    isOpenProgress: false
  }),
  methods: {
    changeProgress(state) {
      this.isOpenProgress = state
    }
  },
  name: 'TenantOrder',
  components: {
    Order,
    OrderStatus,
    OrderProgress
  }
}
</script>
