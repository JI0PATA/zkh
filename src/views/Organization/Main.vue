<template>
  <div>
    <div class="top-with-sidebar">
      <h1 class="page-title">Жильцы</h1>
      <ul class="top-sidebar">
        <router-link :to="{name: 'Home'}" class="top-sidebar-item active">
          <img src="@/assets/img/icons/u_users-alt.svg" alt="Users">
          <span>Жильцы</span>
        </router-link>
        <router-link :to="{name: 'OrganizationOperatorsTable'}" class="top-sidebar-item">
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
        :templateForNew="templateForNewTenant"
        :isAddNew="isAddNewOrganization"
        :data="tenantsData"
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
        name: 'Адрес',
        style: {
          width: '25%'
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
      title: 'Удалить жильца'
    }
  }),
  components: {
    Table
  },
  computed: {
    ...mapGetters(['info', 'tenants']),
    tenantsData() {
      return this.tenants.map(tenant => {
        return {
          id: tenant.id,
          data: [
            {
              field: 'id',
              value: tenant.id,
              isEditable: false
            },
            {
              field: 'address',
              value: tenant.address
            },
            {
              field: 'name',
              value: tenant.name
            },
            {
              field: 'phone',
              value: tenant.phone,
              type: 'phone'
            }
          ]
        }
      })
    },
    templateForNewTenant() {
      return {
        id: Math.random(),
        data: [
          {
            field: 'id',
            value: '',
            isEditable: false
          },
          {
            field: 'address',
            value: ''
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
    ...mapActions(['fetchTenants', 'saveUser', 'addUser', 'trashUser']),
    async saveData(items) {
      const data = {}
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.saveUser(data)
      this.fetchTenants()
    },
    async saveNewOrganization(items) {
      const data = {
        role: 0,
        organization_id: this.info.id
      }
      items.forEach(item => {
        data[item.field] = item.value
      })
      await this.addUser(data)
      this.isAddNewOrganization = false
      this.fetchTenants()
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
      this.fetchTenants()
    }
  },
  async mounted() {
    await this.fetchTenants()
  }
}
</script>
