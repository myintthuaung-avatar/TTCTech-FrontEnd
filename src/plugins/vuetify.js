// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const examTheme = {
  dark: false,
  colors: {
    background: '#F5F7F6',
    surface: '#FFFFFF',
    primary: '#1E7A5F',
    'primary-darken-1': '#155C46',
    secondary: '#2B4C43',
    error: '#C4432B',
    success: '#1E7A5F',
    warning: '#B8862E',
    info: '#2B6CB0'
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'examTheme',
    themes: { examTheme }
  },
  defaults: {
    VBtn: { rounded: 'lg' },
    VCard: { rounded: 'lg' }
  }
})
