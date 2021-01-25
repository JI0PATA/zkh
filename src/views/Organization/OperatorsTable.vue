<template>
  <div>
    <div class="top-with-sidebar">
      <h1 class="page-title">Операторы</h1>
      <ul class="top-sidebar">
        <router-link :to="{name: 'Home'}" class="top-sidebar-item">
          <img src="@/assets/img/icons/u_users-alt.svg" alt="Users">
          <span>Жильцы</span>
        </router-link>
        <router-link :to="{name: 'OrganizationOperatorsTable'}" class="top-sidebar-item active">
          <img src="@/assets/img/icons/u_bag-alt.svg" alt="Bag">
          <span>Операторы</span>
        </router-link>
      </ul>
    </div>

    <div class="container">
      <button
        @click.prevent="addNewOrganization"
        class="input-btn order-btn table-add">Добавить жильца <img src="@/assets/img/icons/u_plus-white.svg" alt="Plus"></button>

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

export default {
  name: 'TableOrganizationOperator',
  data: () => ({
    columnsOrganizations: [
      {
        name: '№',
        style: {
          width: '5%'
        }
      },
      {
        name: 'ФИО',
        style: {
          width: '25%'
        }
      },
      {
        name: 'Телефон',
        style: {
          width: '25%'
        }
      }
    ],
    isAddNewOrganization: false,
    popupData: {
      title: 'Удалить оператора'
    }
  }),
  components: {
    Table
  },
  computed: {
    ...mapGetters(['info', 'operators']),
    organizationsData() {
      return this.operators.map(operator => {
        return {
          id: operator.id,
          data: [
            {
              field: 'id',
              value: operator.id,
              isEditable: false
            },
            {
              field: 'name',
              value: operator.name
            },
            {
              field: 'phone',
              value: operator.phone,
              type: 'phone'
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
            field: 'id',
            value: '',
            isEditable: false
          },
          {
            field: 'name',
            value: ''
          },
          {
            field: 'phone',
            value: '',
            type: 'phone'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['fetchOperators', 'saveUser', 'addUser', 'trashUser']),
    async saveData(items) {
      const data = {}
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.saveUser(data)
      this.fetchOperators()
    },
    async saveNewOrganization(items) {
      const data = {
        role: 1,
        organization_id: this.info.id
      }
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.addUser(data)
      this.isAddNewOrganization = false
      this.fetchOperators()
    },
    addNewOrganization() {
      this.isAddNewOrganization = true
    },
    async trashOrganization(items) {
      const data = {}
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.trashUser(data)
      this.fetchOperators()
    }
  },
  async mounted() {
    await this.fetchOperators()
  }
}
</script>
