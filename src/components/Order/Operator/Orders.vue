<template>
  <div>
    <Order v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import Order from '@/components/Order/Operator/Order'

export default {
  props: ['orders'],
  name: 'OperatorOrders',
  components: {
    Order
  }
}
</script>
