<template>
  <div class="main-layout">
    <NavBar />

    <vue-page-transition name="fade" class="container">
      <router-view></router-view>
    </vue-page-transition>
  </div>
</template>

<script>
import NavBar from '@/components/app/NavBar'
export default {
  name: 'MainLayout',
  components: {
    NavBar
  }
}
</script>
