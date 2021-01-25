<template>
  <div class="toast" v-html="caption">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Toast',
  computed: {
    ...mapGetters(['caption'])
  }
}
</script>
