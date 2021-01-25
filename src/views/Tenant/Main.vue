<template>
  <div>
    <h1 class="page-title">Оставить заявку</h1>

    <div class="container-with-sidebar">
      <div class="container-main">
        <Request />

        <!-- ТАБЫ -->
        <div class="tabs-container">
          <div class="tab" :class="{active: tab === 'active'}" @click="changeTab('active')">
            <div class="tab-icon tab-icon-active"></div>
            <span class="tab-title">Активные заявки</span>
          </div>
          <div class="tab" :class="{active: tab === 'completed'}" @click="changeTab('completed')">
            <div class="tab-icon tab-icon-completed"></div>
            <span class="tab-title">Завершённые заявки</span>
          </div>
        </div>

        <fade-transition>
            <template>
              <Orders :orders="orders" v-if="orders.length" />
              <div v-else class="request-title">Заявок пока нет</div>
            </template>
        </fade-transition>

      </div>

      <Sidebar />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/TenantSidebar'
import Request from '@/components/Request'
import Orders from '@/components/Order/Tenant/Orders'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TenantMain',
  data: () => ({
    tab: 'active',
    statusOrders: 0,
    interval: null
  }),
  computed: {
    ...mapGetters(['orders'])
  },
  methods: {
    ...mapActions(['fetchOrdersForTenant']),
    async changeTab(tab) {
      this.tab = tab
      if (tab === 'active') this.statusOrders = 0
      else this.statusOrders = 1
      await this.fetchOrdersForTenant(this.statusOrders)
    },
    setInterval() {
      setInterval(_ => {
        this.fetchOrdersForTenant(this.statusOrders)
      }, 10000)
    }
  },
  mounted() {
    this.fetchOrdersForTenant(this.statusOrders)
    this.setInterval()
  },
  components: {
    Sidebar,
    Request,
    Orders
  }
}
</script>
