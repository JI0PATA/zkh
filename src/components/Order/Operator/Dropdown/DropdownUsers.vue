<template>
  <div class="udropdown-container">
    <div class="udropdown-title">Направить заявку:</div>
    <ul class="udropdown-list">
      <li class="udropdown-item"
          @click="changeOperator(operator)"
          v-for="operator in operatorsForChange"
          :key="operator.id">{{ operator.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['order'],
  name: 'DropdownUsers',
  methods: {
    ...mapActions(['fetchOperatorsForOrganization', 'changeOperatorForOrder', 'fetchOrders']),
    async changeOperator(operator) {
      await this.changeOperatorForOrder({
        order: this.order,
        operator
      })
      await this.fetchOrders(this.$route.meta.statusOrder)
    }
  },
  computed: {
    ...mapGetters(['info', 'operatorsForChange'])
  },
  mounted() {
    this.fetchOperatorsForOrganization()
  }
}
</script>
