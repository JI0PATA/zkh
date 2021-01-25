<template>
  <a :href="src" target="_blank"
     :style="style">
    <img
      :src="src"
      alt="Image">
  </a>
</template>

<script>
export default {
  props: ['src'],
  name: 'ImageLightbox',
  computed: {
    style() {
      if (this.src === '') {
        return {
          opacity: 0,
          'pointer-events': 'none'
        }
      }
      return {
        opacity: 1
      }
    }
  }
}
</script>
