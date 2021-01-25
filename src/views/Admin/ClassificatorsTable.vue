<template>
  <div>
    <div class="top-with-sidebar">
      <h1 class="page-title">Классификатор</h1>
      <ul class="top-sidebar">
        <router-link :to="{name: 'Home'}" class="top-sidebar-item">
          <img src="@/assets/img/icons/u_business-outline.svg" alt="Users">
          <span>Организации</span>
        </router-link>
        <router-link :to="{name: 'OrganizationOperatorsTable'}" class="top-sidebar-item active">
          <img src="@/assets/img/icons/u_code-slash-outline.svg" alt="Bag">
          <span>Классификатор</span>
        </router-link>
      </ul>
    </div>

    <div class="classificator-container">
      <div class="classificator-title">Залить данные для тренировки</div>
      <div class="classificator-buttons">
        <label class="classificator-input-file">
          <span>Выбрать файл</span>
          <input type="file" ref="file"
                 @change="handleFile"
                 style="display: none;">
        </label>
        <button class="input-btn order-btn"
                @click.prevent="sendFileForTrain"
                :class="{disabled: checkTrainButton}">Тренировать</button>
      </div>
    </div>

    <div class="container">
      <button
        @click.prevent="addNewOrganization"
        class="input-btn order-btn table-add">Добавить классификатор <img src="@/assets/img/icons/u_plus-white.svg" alt="Plus"></button>

      <Table
        @saveData="saveData"
        @saveNew="saveNewOrganization"
        @trashData="trashOrganization"
        @disableEdit="isAddNewOrganization = false"
        :templateForNew="templateForNewOrganization"
        :isAddNew="isAddNewOrganization"
        :data="organizationsData"
        :popupData="popupData"
        :columns="columnsOrganizations"/>
    </div>
  </div>
</template>

<script>
import Table from '@/components/app/Table/Table'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'TableOrganizationOperator',
  data: () => ({
    columnsOrganizations: [
      {
        name: 'ID класса',
        style: {
          width: '20%'
        }
      },
      {
        name: 'Название класса',
        style: {
          width: '30%'
        }
      },
      {
        name: 'Время на выполнение',
        style: {
          width: '25%'
        }
      }
    ],
    isAddNewOrganization: false,
    popupData: {
      title: 'Удалить классификатор'
    },
    file: null,
    interval: null,
    isTrain: false
  }),
  components: {
    Table
  },
  validations: {
  },
  computed: {
    ...mapGetters(['info', 'classificators']),
    organizationsData() {
      return this.classificators.map(classificator => {
        return {
          id: classificator.id,
          data: [
            {
              field: 'class',
              value: classificator.class
            },
            {
              field: 'name',
              value: classificator.name
            },
            {
              field: 'time',
              value: classificator.time
            }
          ]
        }
      })
    },
    templateForNewOrganization() {
      return {
        id: Math.random(),
        data: [
          {
            field: 'class',
            value: ''
          },
          {
            field: 'name',
            value: ''
          },
          {
            field: 'time',
            value: ''
          }
        ]
      }
    },
    checkTrainButton() {
      return !this.file
    }
  },
  methods: {
    ...mapActions(['fetchClassificators', 'saveClassificator', 'addClassificator', 'trashClassificator']),
    async saveData(items) {
      const data = {}
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.saveClassificator(data)
      this.fetchClassificators()
    },
    async saveNewOrganization(items) {
      const data = {}
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.addClassificator(data)
      this.isAddNewOrganization = false
      this.fetchClassificators()
    },
    addNewOrganization() {
      this.isAddNewOrganization = true
    },
    async trashOrganization(items) {
      const data = {}
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.trashClassificator(data)
      this.fetchClassificators()
    },
    handleFile() {
      this.file = !!this.$refs.file.files.length || this.isTrain
    },
    async getStatusTrain() {
      await axios.get('http://80.249.147.63:3000/training')
        .then(res => {
          this.isTrain = res.data
        })
    },
    async sendFileForTrain() {
      if (this.checkTrainButton) return

      await axios.post('http://80.249.147.63:3000/train', this.$refs.file.files[0], {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res.data)
        })
    }
  },
  async mounted() {
    await this.fetchClassificators()
    this.interval = setInterval(_ => {
      this.getStatusTrain()
    }, 10000)
    this.getStatusTrain()
  }
}
</script>
