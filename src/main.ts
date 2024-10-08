import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import configureHTTPInterceptor from './config/configureHTTPInterceptor';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import 'aesthetic-css/aesthetic.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/vue/css/palettes/dark.always.css';
import '@ionic/vue/css/palettes/dark.class.css';
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/vaporwave.scss';
import { createPinia } from 'pinia';
import { useDrinkStore } from '@/store/drinkStore';

if (import.meta.hot) {
    import.meta.hot.on(
        "vite:beforeUpdate",
        /* eslint-disable-next-line no-console */
        () => console.clear()
    );
}

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
configureHTTPInterceptor();

const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(pinia);

router.isReady().then(() => {
    app.mount('#app');
});
useDrinkStore().init();