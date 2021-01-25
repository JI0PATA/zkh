<template>
  <div class="table-item">
    <span v-if="!isEdit || (isEdit && field.isEditable === false)">{{ field.value }}</span>
    <template v-if="isEdit && field.isEditable !== false">
      <input
        @input="handleInput"
        type="text"
        v-model="field.value"
        v-if="!field.type"
        class="input-field">
      <phone-mask-input
        v-else-if="field.type === 'phone'"
        v-model="field.value"
        wrapperClass="input-field-mask-wrapper"
        inputClass="input-field input-field-mask"
        placeholder="+7 (000) 000-00-00"/>
    </template>
  </div>
</template>

<script>
import PhoneMaskInput from 'vue-phone-mask-input'

export default {
  inheritAttrs: true,
  props: ['field', 'isEdit'],
  name: 'TableCell',
  methods: {
    handleInput() {
      this.$emit('input', this.field)
    }
  },
  components: {
    PhoneMaskInput
  }
}
</script>
