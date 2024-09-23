<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ drink.name }}</ion-title>

      <ion-buttons slot="end">
        <ion-button @click="cancel" :strong="true">
          <ion-icon slot="icon-only" :icon="close"/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding" :scroll-y="true">
    <div class="modal-content">
      <div class="drink-image-citation">
        <ion-img :src="imageSrc"
                 class="aesthetic-effect-crt drink-image"
                 @click="toggleFullscreen($event)"/>
        <ion-label class="citation">{{ drink.description }}</ion-label>
      </div>

      <DrinkInformations :drink="drink"/>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonTitle,
    IonLabel,
    IonToolbar, modalController,
} from '@ionic/vue';
import { close } from 'ionicons/icons';
import screenfull from 'screenfull';
import DrinkInformations from '@/views/Drink/DrinkInformations.vue';
import { onMounted, PropType, ref } from 'vue';
import { Drink } from '@/interfaces/Drink';
import { useStore } from '@/store/mainStore';
import cacheService from '@/service/cacheService';
import placeholder from '@/assets/images/placeholder.svg';

const props = defineProps({
    drink: {
        type: Object as PropType<Drink>,
        required: true
    },
});

const apiUrl = process.env.VITE_API_URL;

const imageSrc = ref('');

const loadImage = async (drink: Drink) => {
    try {
        return await cacheService.loadCachedImage(drink.name + '_image');
    } catch (e) {
        if (useStore().network) {
            return apiUrl + '/uploads/images/' + drink.image;
        } else {
            return placeholder;
        }
    }
}

// Charger l'icône lors du montage du composant
onMounted(async () => {
    imageSrc.value = await loadImage(props.drink);
});

const cancel = () => modalController.dismiss(null, 'cancel');

const toggleFullscreen = (event: Event) => {
    if (event.target instanceof Element) {
        if (screenfull.isEnabled) {
            screenfull.toggle(event.target);
        }
    }
}
</script>

<style scoped>
.citation {
    margin-left: 16px;
    margin-top: 0.25rem;
    font-style: italic;
}

.drink-image {
    max-width: 500px;
    cursor: pointer;
}

.drink-image-citation {
    max-width: 500px;
}

/* Vos styles pour les écrans d'ordinateurs de haute résolution */
@media (min-width: 1025px) {
    .modal-content {
        display: flex;
        flex-wrap: nowrap;
        align-items: start;
    }
}

@media only screen and (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2), only screen and (max-width: 768px) and (min-resolution: 192dpi) {
    /* Vos styles pour les téléphones à haute résolution */
    .modal-content {
        display: grid;
        grid-template-rows: 3fr;
        flex-wrap: wrap;
    }
}
</style>
