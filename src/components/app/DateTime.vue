<template>
  <div class="request-datetime-container">
    <div class="request-datetime-date">
      <img src="@/assets/img/icons/u_calendar-alt.svg" alt="Calendar">
      <input class="request-datetime-title request-datetime-date-title"
             placeholder="Дата"
             v-model="dateInput">
      <date-picker @change="handleDate" v-model="datePicker" type="date" :lang="lang"></date-picker>
    </div>
    <div class="request-datetime-time">
      <input class="request-datetime-title"
             :placeholder="time_placeholder"
             maxlength="5"
             v-model="timePicker"
             @input="handleTime"
             @focusin="timeFieldFocus"
             @focusout="timeFieldFocusOut"
             v-mask="'##:##'">
    </div>
  </div>
</template>

<script>
import 'vue2-datepicker/index.css'
import DatePicker from 'vue2-datepicker'
import dateFilter from '@/filters/date.filter'

export default {
  name: 'DateTime',
  filters: {
    dateFilter
  },
  data: () => ({
    datePicker: '',
    timePicker: '',
    time_placeholder: 'Время',
    lang: {
      formatLocale: {
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Суббота', 'Пятница'],
        weekdaysShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Пят', 'Суб'],
        weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        firstDayOfWeek: 1,
        firstWeekContainsDate: 1
      }
    }
  }),
  computed: {
    dateInput() {
      return this.datePicker ? dateFilter(this.datePicker) : 'Дата'
    }
  },
  methods: {
    timeFieldFocus() {
      this.time_placeholder = '__:__'
    },
    timeFieldFocusOut() {
      this.time_placeholder = 'Время'
    },
    handleDate() {
      this.$emit('changeDate', this.datePicker)
    },
    handleTime(val) {
      this.$emit('changeTime', this.timePicker)
    }
  },
  components: {
    DatePicker
  }
}
</script>
