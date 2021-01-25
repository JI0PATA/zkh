<template>
  <div class="stabs-container">
    <ul class="stabs-list">
      <router-link :to="{name: 'Home'}" class="stabs-item"
          :class="{active: this.$route.name === 'Home'}">Новые заявки <span class="stabs-item--badge">{{ countNew }}</span></router-link>
      <router-link :to="{name: 'OperatorStatusSearch'}" class="stabs-item"
          :class="{active: this.$route.name === 'OperatorStatusSearch'}">Поиск специалиста</router-link>
      <router-link :to="{name: 'OperatorStatusSpecialist'}" class="stabs-item"
          :class="{active: this.$route.name === 'OperatorStatusSpecialist'}"
      >Специалист направлен</router-link>
      <router-link :to="{name: 'OperatorStatusDone'}" class="stabs-item"
          :class="{active: this.$route.name === 'OperatorStatusDone'}"
      >Выполненные заявки</router-link>
    </ul>
    <div class="card-line"></div>
    <ul class="stabs-list">
      <router-link :to="{name: 'OperatorNewRequest'}"
                   :class="{active: tab === 'request'}"
                   class="stabs-item">Добавить заявку <img src="@/assets/img/icons/u_plus.svg" alt="Plus"></router-link>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['tab'],
  name: 'OperatorSidebar',
  computed: {
    ...mapGetters(['countNew'])
  },
  methods: {
    ...mapActions(['getCountNew']),
    changeTab(tab) {
      this.$emit('changeTab', tab)
    }
  },
  mounted() {
    this.getCountNew()
    setInterval(_ => {
      this.getCountNew()
    }, 10000)
  }
}
</script>
