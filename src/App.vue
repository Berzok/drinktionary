<template>
  <ion-app>
    <LoadingSpinner/>
    <ApplicationMenu/>
    <ApplicationHeader/>

    <ion-content id="main-content" class="aesthetic-effect-crt">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-router-outlet class="ion-padding"></ion-router-outlet>
    </ion-content>

    <ion-footer :translucent="false">
      <ion-toolbar>
        <ion-title slot="end">
          v{{ version }}
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>

<script setup lang="ts">
import {
    IonApp,
    IonContent,
    IonFooter,
    IonRouterOutlet,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    IonToolbar, RefresherEventDetail,
    useBackButton,
    useIonRouter, toastController
} from '@ionic/vue';
import ApplicationHeader from '@/views/Navigation/ApplicationHeader.vue';
import ApplicationMenu from '@/views/Navigation/ApplicationMenu.vue';
import LoadingSpinner from '@/views/LoadingSpinner.vue';
import { App } from '@capacitor/app';
import { useDrinkStore } from '@/store/drinkStore';

const version = process.env.VITE_APP_VERSION;

const ionRouter = useIonRouter();
useBackButton(-1, () => {
    if (!ionRouter.canGoBack()) {
        App.exitApp();
    }
});

interface RefresherCustomEvent extends CustomEvent {
    detail: RefresherEventDetail;
    target: HTMLIonRefresherElement;
}

const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(async () => {
        // Any calls to load data go here
        try {
            const response = await useDrinkStore().fetchDrinks();
            await presentToast(response, 'success');
            await event.target.complete();
        } catch (error) {
            const e: Error = error as Error;
            await presentToast(e.message, 'danger');
            await event.target.complete();
        }
    }, 2000);
};

const presentToast = async (message: string, colour: 'success' | 'danger') => {
    console.dir(colour);
    const toast = await toastController.create({
        message: message,
        color: colour,
        duration: 2200,
        position: 'top',
        id: 'status_modal'
    });

    await toast.present();
}
</script>

<style>
@font-face {
    font-family: "CyberpunkWaifus";
    src: local("CyberpunkWaifus"),
    url('./assets/fonts/CyberpunkWaifus.woff2')
}

body {
    --ion-font-family: CyberpunkWaifus, serif !important;
}

ion-menu ion-content {
    --background: var(--ion-item-background, var(--ion-background-color, #fff));
}
</style>
<style lang="scss">
.glitch {
  position: relative;
  color: #fff;
  margin-left: 1.25rem;
  font-size: 40px;
  text-transform: none;
}

/*This adds a "crt scanlines" effect to the screen*/
.crt-scanlines::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  z-index: 2;
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}

/*This adds a "flickering screen" effect*/
.crt-flicker::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(18, 16, 16, 0.1);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% {
    opacity: 0.27861;
  }
  5% {
    opacity: 0.34769;
  }
  10% {
    opacity: 0.23604;
  }
  15% {
    opacity: 0.90626;
  }
  20% {
    opacity: 0.18128;
  }
  25% {
    opacity: 0.83891;
  }
  30% {
    opacity: 0.65583;
  }
  35% {
    opacity: 0.67807;
  }
  40% {
    opacity: 0.26559;
  }
  45% {
    opacity: 0.84693;
  }
  50% {
    opacity: 0.96019;
  }
  55% {
    opacity: 0.08594;
  }
  60% {
    opacity: 0.20313;
  }
  65% {
    opacity: 0.71988;
  }
  70% {
    opacity: 0.53455;
  }
  75% {
    opacity: 0.37288;
  }
  80% {
    opacity: 0.71428;
  }
  85% {
    opacity: 0.70419;
  }
  90% {
    opacity: 0.7003;
  }
  95% {
    opacity: 0.36108;
  }
  100% {
    opacity: 0.24387;
  }
}

/*Adds a "color separation flicker" effect to all text*/
.crt-colorsep {
  animation: textShadow 1.6s infinite;
}

@keyframes textShadow {
  0% {
    text-shadow: 0.4389924193300864px 0 1px rgba(0, 30, 255, 0.5), -0.4389924193300864px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  5% {
    text-shadow: 2.7928974010788217px 0 1px rgba(0, 30, 255, 0.5), -2.7928974010788217px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  10% {
    text-shadow: 0.02956275843481219px 0 1px rgba(0, 30, 255, 0.5), -0.02956275843481219px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  15% {
    text-shadow: 0.40218538552878136px 0 1px rgba(0, 30, 255, 0.5), -0.40218538552878136px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  20% {
    text-shadow: 3.4794037899852017px 0 1px rgba(0, 30, 255, 0.5), -3.4794037899852017px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  25% {
    text-shadow: 1.6125630401149584px 0 1px rgba(0, 30, 255, 0.5), -1.6125630401149584px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  30% {
    text-shadow: 0.7015590085143956px 0 1px rgba(0, 30, 255, 0.5), -0.7015590085143956px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  35% {
    text-shadow: 3.896914047650351px 0 1px rgba(0, 30, 255, 0.5), -3.896914047650351px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  40% {
    text-shadow: 3.870905614848819px 0 1px rgba(0, 30, 255, 0.5), -3.870905614848819px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  45% {
    text-shadow: 2.231056963361899px 0 1px rgba(0, 30, 255, 0.5), -2.231056963361899px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  50% {
    text-shadow: 0.08084290417898504px 0 1px rgba(0, 30, 255, 0.5), -0.08084290417898504px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  55% {
    text-shadow: 2.3758461067427543px 0 1px rgba(0, 30, 255, 0.5), -2.3758461067427543px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  60% {
    text-shadow: 2.202193051050636px 0 1px rgba(0, 30, 255, 0.5), -2.202193051050636px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  65% {
    text-shadow: 2.8638780614874975px 0 1px rgba(0, 30, 255, 0.5), -2.8638780614874975px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  70% {
    text-shadow: 0.48874025155497314px 0 1px rgba(0, 30, 255, 0.5), -0.48874025155497314px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  75% {
    text-shadow: 1.8948491305757957px 0 1px rgba(0, 30, 255, 0.5), -1.8948491305757957px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  80% {
    text-shadow: 0.0833037308038857px 0 1px rgba(0, 30, 255, 0.5), -0.0833037308038857px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  85% {
    text-shadow: 0.09769827255241735px 0 1px rgba(0, 30, 255, 0.5), -0.09769827255241735px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  90% {
    text-shadow: 3.443339761481782px 0 1px rgba(0, 30, 255, 0.5), -3.443339761481782px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  95% {
    text-shadow: 2.1841838852799786px 0 1px rgba(0, 30, 255, 0.5), -2.1841838852799786px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
  100% {
    text-shadow: 2.6208764473832513px 0 1px rgba(0, 30, 255, 0.5), -2.6208764473832513px 0 1px rgba(255, 0, 80, 0.3), 0 0 3px;
  }
}

.line {
  &:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
  }

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation: clip 3000ms $i * -300ms linear infinite,
      glitch#{$i} 1500ms random(3000) * -1ms linear infinite;

      @keyframes glitch#{$i} {
        0% {
          transform: translateX(0);
        }
        80% {
          transform: translateX(0);
          color: #fff;
        }
        85% {
          transform: translateX(random(10) - 5px);
          color: #4E9A26;
        }
        90% {
          transform: translateX(random(10) - 5px);
          color: #AC1212;
        }
        95% {
          transform: translateX(random(10) - 5px);
          color: #fff;
        }
        100% {
          transform: translateX(0);
        }
      }
    }
  }
}

@keyframes clip {
  0% {
    clip-path: polygon(
                    0 100%,
                    100% 100%,
                    100% 120%,
                    0 120%
    );
  }

  100% {
    clip-path: polygon(
                    0 -20%,
                    100% -20%,
                    100% 0%,
                    0 0
    );
  }
}

</style>

