import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { clickOutside } from './directives';

import 'primeicons/primeicons.css'
import { definePreset } from '@primevue/themes';

let data = JSON.parse(document.getElementById('json_data')?.textContent || "{}")
Object.keys(data).forEach(key => {
    try {
        data[key] = JSON.parse(data[key])
    } catch (error) {
    }
})

const MyPreset = definePreset(Aura, {
    // semantic: {
    //     colorScheme: {
    //         dark: {
    //             primary: {
    //                 color: '{zinc.50}',
    //                 inverseColor: '{zinc.950}',
    //                 hoverColor: '{zinc.100}',
    //                 activeColor: '{zinc.200}'
    //             },
    //             highlight: {
    //                 background: 'rgba(250, 250, 250, .16)',
    //                 focusBackground: 'rgba(250, 250, 250, .24)',
    //                 color: 'rgba(255,255,255,.87)',
    //                 focusColor: 'rgba(255,255,255,.87)'
    //             }
    //         }
    //     }
    // }
    //Your customizations, see the following sections for examples
});

const app = createApp(App, data)
// import { createPinia } from 'pinia'
// app.use(createPinia()).use(PrimeVue, {
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            // darkModeSelector: '.fake-dark-selector',
            darkModeSelector: '.dark',
            cssLayer: false
        }
    }
})
// .component('MultiSelect', MultiSelect);
app.directive("click-outside", clickOutside)
app.mount('#app')