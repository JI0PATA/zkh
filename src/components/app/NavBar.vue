<template>
  <div class="nav-container">
    <div class="nav container">
      <div class="nav-left">
        <ul class="nav-menu">
          <router-link to="/" class="nav-link" tag="li">
            <img src="@/assets/img/logo/logo.svg" alt="Logo" class="nav-link--logo">
          </router-link>
          <router-link
            :to="link.link"
            v-for="link of links"
            :key="link.link"
            class="nav-link"
            tag="li"
          >{{ link.title }}
          </router-link>
          <li v-if="info.role === 0" @click.prevent="openCallbackPopup" class="nav-link color">Заказать звонок</li>
        </ul>
      </div>
      <div class="nav-right">
        <img src="@/assets/img/avatar.svg" alt="Avatar" v-if="info.role === 0">
        <img src="@/assets/img/avatar_operator.svg" alt="Avatar" v-else-if="info.role === 1">
        <img src="@/assets/img/avatar_organization.svg" alt="Avatar" v-else>
        <span class="nav-profile--name">{{ info.name }}</span>
        <img src="@/assets/img/icons/fi_menu.svg" class="nav-profile--burger" @click="profilePopup = true" v-show="!profilePopup">
        <img src="@/assets/img/icons/u_close.svg" class="nav-profile--burger" @click="profilePopup = false" v-show="profilePopup">

        <fade-transition>
          <div class="profile-panel" v-show="profilePopup">
            <div class="profile-section">
              <div class="profile-info">
                <div class="profile-info-row">
                  <div class="profile-name">{{ info.name }}</div>
                  <img src="@/assets/img/avatar.svg" alt="Avatar" class="profile-avatar" v-if="info.role === 0">
                  <img src="@/assets/img/avatar_operator.svg" alt="Avatar" class="profile-avatar" v-else-if="info.role === 1">
                  <img src="@/assets/img/avatar_organization.svg" alt="Avatar" class="profile-avatar" v-else>
                </div>
                <div class="profile-status">{{ roles[info.role] }}</div>
              </div>
            </div>
            <div class="profile-section">
              <div class="profile-info-data" v-if="info.email">{{ info.email }}</div>
              <div class="profile-info-data" v-if="info.phone">{{ info.phone | phoneFilter }}</div>
            </div>
            <div class="profile-section profile-section--logout">
              <div class="profile-logout" @click="logout">Выйти <img src="@/assets/img/icons/u_exit.svg" alt="Exit"></div>
            </div>
          </div>
        </fade-transition>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import phoneFilter from '@/filters/phone.filter'

export default {
  name: 'NavBar',
  filters: {
    phoneFilter
  },
  data: () => ({
    links: [
      {
        title: 'О компании',
        link: '/about'
      },
      {
        title: 'Новости',
        link: '/news'
      },
      {
        title: 'Партнёры',
        link: '/partners'
      }
    ],
    profilePopup: false,
    callbackPopup: false
  }),
  computed: {
    ...mapGetters(['info', 'roles'])
  },
  methods: {
    ...mapActions(['openCallbackPopup', 'logout'])
  }
}
</script>
