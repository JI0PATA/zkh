<template>
  <Order :order="order">
    <template v-slot:header>
      <div class="order-header-container">
        <div class="order-header">
          <div class="order-header--title">{{ order.user.address }}</div>
          <div class="order-header--title order-header--phone">{{ order.user.phone | phoneFilter }}</div>
          <div class="order-header--name">{{ order.user.name }}</div>
          <div class="order-dropdown-dots" v-if="order.status > 0">
            <img src="@/assets/img/icons/u_ellipsis-v.svg" @click="changeDropdownUsers" alt="Dots">
            <DropdownUsers :order="order" v-show="isOpenDropdownUsers" />
          </div>
        </div>
        <div class="card-line"></div>
      </div>
    </template>

    <template v-slot:dropdown-classificator v-if="order.status > 0">
      <div class="order-status--uncover">
        <img
          src="@/assets/img/icons/fi_chevron-down.svg"
          @click="changeDropdownClassificator(true)"
          alt="Down arrow">
        <DropdownClassificator
          :order="order"
          @closeDropdownClassificator="changeDropdownClassificator"
          v-show="isOpenDropdownClassificator" />
      </div>
    </template>

    <template v-slot:tenant-time>
      <div class="order-tenant-time-container" v-if="order.visit_at">
        <span class="order-tenant-date">{{ order.visit_at | dateFormatFilter('date') }}</span>
        <div class="card-vertical-line"></div>
        <span class="order-tenant-time">{{ order.visit_at | dateFormatFilter('hours') }}<span class="order-tenant-time-separator">:</span>{{ order.visit_at | dateFormatFilter('minutes') }}</span>
      </div>
    </template>

    <FirstStepOrder :order="order" v-if="order.status === 0"/>
    <SecondStepOrder :order="order" v-if="order.status === 1" />
    <ThirdStepOrder :order="order" v-if="order.status === 2"/>
    <FourthStepOrder :order="order" v-if="order.status === 3"/>
  </Order>
</template>

<script>
import Order from '@/components/Order/Order'
import FirstStepOrder from '@/components/Order/Operator/FirstStep'
import SecondStepOrder from '@/components/Order/Operator/SecondStep'
import ThirdStepOrder from '@/components/Order/Operator/ThirdStep'
import FourthStepOrder from '@/components/Order/Operator/FourthStep'
import DropdownClassificator from '@/components/Order/Operator/Dropdown/DropdownClassificator'
import DropdownUsers from '@/components/Order/Operator/Dropdown/DropdownUsers'
import phoneFilter from '@/filters/phone.filter'
import dateFormatFilter from '@/filters/dateFormat.filter'

export default {
  props: ['order'],
  data: () => ({
    isOpenProgress: false,
    isOpenDropdownClassificator: false,
    isOpenDropdownUsers: false
  }),
  filters: {
    phoneFilter,
    dateFormatFilter
  },
  methods: {
    changeProgress(state) {
      this.isOpenProgress = state
    },
    changeDropdownClassificator(state) {
      this.isOpenDropdownClassificator = state
    },
    changeDropdownUsers() {
      this.isOpenDropdownUsers = !this.isOpenDropdownUsers
    }
  },
  name: 'TenantOrder',
  components: {
    Order,
    FirstStepOrder,
    SecondStepOrder,
    ThirdStepOrder,
    FourthStepOrder,
    DropdownClassificator,
    DropdownUsers
  }
}
</script>
