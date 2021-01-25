<template>
  <div class="table-row" :class="{'row-edit': isEdit}">
    <Cell :field="item"
          :isEdit="isEdit"
          v-for="(item, index) in items"
          :style="columns[index].style"
          @input="changeData"
          :key="item.field" />
    <div class="table-item-actions">
      <button class="table-button">
        <img src="@/assets/img/icons/u_pen.svg" alt="Edit"
             v-show="!isEdit"
             @click="enableEdit">
        <img src="@/assets/img/icons/u_ok.svg" alt="Ok"
             @click="saveData"
             v-show="isEdit">
      </button>
      <button class="table-button">
        <img src="@/assets/img/icons/u_trash.svg" alt="Trash"
             @click="openTrashPopup"
             v-show="!isEdit"
        >
        <img src="@/assets/img/icons/u_close-button.svg"
             @click="disableEdit"
             alt="Close" v-show="isEdit">
      </button>
    </div>
    <div class="table-trash-popup" v-show="isOpenTrashPopup">
      <div class="table-trash-popup--title">{{ popupData.title }}</div>
      <div class="table-trash-popup--info">
        <div class="table-trash-popup--info-item" v-if="dataItem.name">{{ dataItem.name }}</div>
        <div class="table-trash-popup--info-item" v-if="dataItem.email">{{ dataItem.email }}</div>
        <div class="table-trash-popup--info-item" v-if="dataItem.phone">{{ dataItem.phone }}</div>
      </div>
      <div class="table-trash-popup--actions">
        <button
          @click="trashItem"
          class="input-btn order-btn table-trash-popup--delete">Удалить</button>
        <button
          @click="closeTrashPopup"
          class="input-btn order-btn input-btn-white table-trash-popup--cancel">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from '@/components/app/Table/Cell'

export default {
  props: ['items', 'columns', 'isEditDefault', 'popupData'],
  name: 'TableRow',
  data: () => ({
    isEdit: false,
    isOpenTrashPopup: false
  }),
  methods: {
    enableEdit() {
      this.isEdit = true
    },
    disableEdit() {
      this.isEdit = false
      this.$emit('disableEdit')
    },
    saveData() {
      this.isEdit = false
      this.$emit('saveData', this.items)
    },
    changeData(field) {
      this.items.map((item) => {
        if (item.field === field.field) item.value = field.value
        return item
      })
    },
    trashItem() {
      this.$emit('trashData', this.items)
    },
    openTrashPopup() {
      this.isOpenTrashPopup = true
    },
    closeTrashPopup() {
      this.isOpenTrashPopup = false
    }
  },
  computed: {
    dataItem() {
      const data = {}
      this.items.forEach(item => {
        data[item.field] = item.value
      })
      return data
    }
  },
  mounted() {
    if (this.isEditDefault) this.isEdit = true
  },
  components: {
    Cell
  }
}
</script>
