<template>
  <div class="popup">
    <div class="popup-overlay" @click="closePopup"></div>
    <div class="popup-container">
      <div class="popup-close" @click="closePopup">
        <img src="@/assets/img/icons/u_close.svg">
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  methods: {
    closePopup() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.popup {
  .input-textarea {
    margin-top: 32px;
    height: 132px;
  }
  .input-btn {
    margin-top: 24px;
    align-self: flex-end;
  }
}
</style>
