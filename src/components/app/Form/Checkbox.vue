<template>
  <label class="input-checkbox-container">
    <input type="checkbox" style="display: none;" v-model="checkbox" @change="handleCheckbox">
    <div class="input-checkbox">
      <img src="@/assets/img/icons/u_check.svg" alt="Check" class="input-checkbox--check">
    </div>
  </label>
</template>

<script>
export default {
  props: ['checked'],
  data: () => ({
    checkbox: false
  }),
  name: 'Checkbox',
  methods: {
    handleCheckbox() {
      this.$emit('change', this.checkbox)
    }
  },
  mounted() {
    this.checkbox = this.checked
  }
}
</script>
