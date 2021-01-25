<template>
  <div>
    <h1 class="page-title">Поиск специалиста</h1>

    <div class="container-with-sidebar">
      <div class="container-main">
        <Orders :orders="orders" v-if="orders.length"/>
        <div class="request-title" v-else>Заявок нет</div>
      </div>

      <Sidebar />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/OperatorSidebar'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Orders from '@/components/Order/Operator/Orders'

export default {
  name: 'OperatorStatusSearch',
  data: () => ({
    status: 1,
    interval: null
  }),
  computed: {
    ...mapGetters(['info', 'orders'])
  },
  methods: {
    ...mapActions(['fetchOrders']),
    ...mapMutations(['setOrders']),
    setInterval() {
      this.interval = setInterval(_ => {
        this.fetchOrders(this.status)
      }, 10000)
    }
  },
  mounted() {
    this.setOrders([])
    this.fetchOrders(this.status)
  },
  components: {
    Sidebar,
    Orders
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
