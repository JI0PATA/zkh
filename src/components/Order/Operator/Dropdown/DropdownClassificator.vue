<template>
  <div class="dropdown-container">
    <div class="dropdown-title-container">
      <div class="dropdown-title">{{ order.classificator.name }}</div>
      <div class="dropdown-close">
        <img
          @click="$emit('closeDropdownClassificator', false)"
          src="@/assets/img/icons/u_angle-down.svg"
          alt="Down">
      </div>
    </div>
    <ul class="dropdown-list">
      <li class="dropdown-item"
          v-for="c in classificators"
          :class="{active: c.id === order.classificator.id}"
          @click="changeClassificatorHandle(c)"
          :key="c.id">{{ c.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['order'],
  name: 'DropdownClassificator',
  methods: {
    ...mapActions(['changeClassificator', 'fetchOrders', 'fetchClassificators']),
    async changeClassificatorHandle(classificator) {
      if (classificator.id === this.order.classificator.id) return

      await this.changeClassificator({
        order: this.order,
        classificator
      })
      this.fetchOrders(this.$route.meta.statusOrder)
      this.$toast('Классификатор изменён')
    }
  },
  computed: {
    ...mapGetters(['info', 'classificators'])
  },
  async mounted() {
    await this.fetchClassificators()
  }
}
</script>
