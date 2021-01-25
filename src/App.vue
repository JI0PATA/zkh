<template>
  <div id="app">
    <vue-page-transition name="fade">
      <component :is="layout">
          <router-view/>
      </component>
    </vue-page-transition>

    <portal-target name="popup"></portal-target>
    <fade-transition>
      <Toast v-if="toast" key="toast" />
    </fade-transition>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import Toast from '@/components/app/Toast'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    EmptyLayout,
    MainLayout,
    Toast
  },
  computed: {
    ...mapGetters(['toast']),
    layout () {
      return `${this.$route.meta.layout || 'main'}-layout`
    }
  }
}
</script>

<style lang="scss">
@import "assets/css/style";
</style>
