<template>
  <div class="order-container">
    <div class="order-date-container">
      <div class="order-date">{{ order.created_at | dateFormatFilter('date') }}</div>
      <div class="order-time">{{ order.created_at | dateFormatFilter('time') }}</div>
    </div>
    <div class="order-panel">
      <slot name="header" class="order-header" />
      <div class="order-title">{{ order.classificator.name }} <slot name="dropdown-classificator"/> </div>
      <div class="order-description">{{ order.message }}</div>
      <div class="order-images" v-if="order.photos.length">
        <ImageLightbox :src="photo.link" v-for="photo in order.photos" :key="photo.link" />
        <ImageLightbox :src="''" v-for="i in 5 - order.photos.length" :key="i"/>
      </div>
      <slot name="tenant-time"/>
      <div class="card-line"></div>

      <slot />
    </div>
  </div>
</template>

<script>
import ImageLightbox from '@/components/app/Image'
import dateFormatFilter from '@/filters/dateFormat.filter'

export default {
  props: ['order'],
  name: 'Order',
  filters: {
    dateFormatFilter
  },
  components: {
    ImageLightbox
  }
}
</script>
