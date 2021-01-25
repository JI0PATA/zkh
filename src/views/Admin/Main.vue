<template>
  <div>
    <div class="top-with-sidebar">
      <h1 class="page-title">Организации</h1>
      <ul class="top-sidebar">
        <router-link :to="{name: 'Home'}" class="top-sidebar-item active">
          <img src="@/assets/img/icons/u_business-outline.svg" alt="Users">
          <span>Организации</span>
        </router-link>
        <router-link :to="{name: 'AdminClassificatorsTable'}" class="top-sidebar-item">
          <img src="@/assets/img/icons/u_code-slash-outline.svg" alt="Bag">
          <span>Классификатор</span>
        </router-link>
      </ul>
    </div>

    <div class="container">
      <button
        @click.prevent="addNewOrganization"
        class="input-btn order-btn table-add">Добавить организацию <img src="@/assets/img/icons/u_plus-white.svg" alt="Plus"></button>

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
  name: 'AdminOrganizations',
  data: () => ({
    columnsOrganizations: [
      {
        name: '№',
        style: {
          width: '5%'
        }
      },
      {
        name: 'Название организации',
        style: {
          width: '25%'
        }
      },
      {
        name: 'Почта компании',
        style: {
          width: '25%'
        }
      },
      {
        name: 'Количество квартир',
        style: {
          width: '25%'
        }
      }
    ],
    isAddNewOrganization: false,
    popupData: {
      title: 'Удалить организацию'
    }
  }),
  components: {
    Table
  },
  computed: {
    ...mapGetters(['organizations']),
    organizationsData() {
      return this.organizations.map(organization => {
        return {
          id: organization.id,
          data: [
            {
              field: 'id',
              value: organization.id,
              isEditable: false
            },
            {
              field: 'name',
              value: organization.name
            },
            {
              field: 'email',
              value: organization.email
            },
            {
              field: 'count_flat',
              value: organization.count_flat
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
            field: 'email',
            value: ''
          },
          {
            field: 'count_flat',
            value: ''
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['fetchOrganizations', 'saveUser', 'addUser', 'trashUser']),
    async saveData(items) {
      const data = {}
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.saveUser(data)
      this.fetchOrganizations()
    },
    async saveNewOrganization(items) {
      const data = {
        role: 2
      }
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.addUser(data)
      this.isAddNewOrganization = false
      this.fetchOrganizations()
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
      this.fetchOrganizations()
    }
  },
  async mounted() {
    await this.fetchOrganizations()
  }
}
</script>
