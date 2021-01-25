<template>
  <div class="table">
    <div class="table-head">
      <div class="table-head-item"
           :style="c.style"
           v-for="c in columns" :key="c.name">{{ c.name }}</div>
      <div class="table-head-actions"></div>
    </div>
    <div class="table-body">
      <Row @saveData="saveNew"
           @disableEdit="disableEdit"
           :isEditDefault="true"
           :items="templateForNew.data"
           :popupData="popupData"
           :columns="columns"
           v-if="isAddNew"
           :key="templateForNew.id"></Row>
      <Row @saveData="saveData"
           @trashData="trashData"
           :popupData="popupData"
           :items="r.data"
           :columns="columns"
           v-for="r in data"
           :key="r.id" />
    </div>
  </div>
</template>

<script>
import Row from '@/components/app/Table/Row'

export default {
  props: ['data', 'columns', 'isAddNew', 'templateForNew', 'popupData'],
  name: 'Table',
  methods: {
    saveData(items) {
      this.$emit('saveData', items)
    },
    saveNew(items) {
      this.$emit('saveNew', items)
      this.emptyTemplate()
    },
    emptyTemplate() {
      this.templateForNew.data.forEach(item => {
        item.value = ''
      })
    },
    trashData(items) {
      this.$emit('trashData', items)
    },
    disableEdit() {
      this.$emit('disableEdit')
      this.emptyTemplate()
    }
  },
  components: {
    Row
  }
}
</script>
