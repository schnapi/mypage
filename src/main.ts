import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { clickOutside } from './directives';

import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: '.dark',
            cssLayer: false
        }
    }
})
// .component('MultiSelect', MultiSelect);
app.directive("click-outside", clickOutside)
app.mount('#app')