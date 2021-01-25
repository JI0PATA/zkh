<template>
  <div>
    <component :is="component"></component>
    <Loader v-if="loader"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TenantMain from '@/views/Tenant/Main'
import OperatorMain from '@/views/Operator/Main'
import OrganizationMain from '@/views/Organization/Main'
import AdminMain from '@/views/Admin/Main'
import Loader from '@/components/app/Loader'

export default {
  name: 'Home',
  data: () => ({
    roles: {
      0: 'tenant',
      1: 'operator',
      2: 'organization',
      3: 'admin'
    },
    loader: false
  }),
  computed: {
    ...mapGetters(['info']),
    component () {
      return `${this.roles[this.info.role]}-main`
    }
  },
  components: {
    TenantMain,
    OperatorMain,
    OrganizationMain,
    AdminMain,
    Loader
  }
}
</script>
