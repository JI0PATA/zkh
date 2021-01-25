import LoginAdmin from '@/views/Login/Admin.vue'
import LoginOrganization from '@/views/Login/Organization.vue'
import LoginOperator from '@/views/Login/Operator.vue'
import LoginTenant from '@/views/Login/Tenant.vue'
import RecoveryPasswordEmail from '@/views/RecoveryPassword/Email.vue'
import RecoveryPasswordPhone from '@/views/RecoveryPassword/Phone.vue'
import Home from '@/views/Home.vue'
import OrganizationOperatorsTable from '@/views/Organization/OperatorsTable.vue'
import AdminClassificatorsTable from '@/views/Admin/ClassificatorsTable.vue'
import OperatorRequest from '@/views/Operator/Request.vue'
import OperatorStatusSearch from '@/views/Operator/Status/Search.vue'
import OperatorStatusSpecialist from '@/views/Operator/Status/Specialist.vue'
import OperatorStatusDone from '@/views/Operator/Status/Done.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/login/admin',
    name: 'LoginAdmin',
    component: LoginAdmin,
    meta: { layout: 'empty', auth: false }
  },
  {
    path: '/login/organization',
    name: 'LoginOrganization',
    component: LoginOrganization,
    meta: { layout: 'empty', auth: false }
  },
  {
    path: '/login/operator',
    name: 'LoginOperator',
    component: LoginOperator,
    meta: { layout: 'empty', auth: false }
  },
  {
    path: '/login',
    name: 'LoginTenant',
    component: LoginTenant,
    meta: { layout: 'empty', auth: false }
  },
  {
    path: '/recovery/email',
    name: 'RecoveryEmail',
    component: RecoveryPasswordEmail,
    meta: { layout: 'empty', auth: false }
  },
  {
    path: '/recovery/phone',
    name: 'RecoveryPhone',
    component: RecoveryPasswordPhone,
    meta: { layout: 'empty', auth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/operator/request',
    name: 'OperatorNewRequest',
    component: OperatorRequest,
    meta: { role: 1, statusOrder: 0 }
  },
  {
    path: '/operator/status/search',
    name: 'OperatorStatusSearch',
    component: OperatorStatusSearch,
    meta: { role: 1, statusOrder: 1 }
  },
  {
    path: '/operator/status/specialist',
    name: 'OperatorStatusSpecialist',
    component: OperatorStatusSpecialist,
    meta: { role: 1, statusOrder: 2 }
  },
  {
    path: '/operator/status/done',
    name: 'OperatorStatusDone',
    component: OperatorStatusDone,
    meta: { role: 1, statusOrder: 3 }
  },
  {
    path: '/organization/operators',
    name: 'OrganizationOperatorsTable',
    component: OrganizationOperatorsTable,
    meta: { role: 2 }
  },
  {
    path: '/admin/classificators',
    name: 'AdminClassificatorsTable',
    component: AdminClassificatorsTable,
    meta: { role: 3 }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: { auth: null }
  }
]

export default routes
