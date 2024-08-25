<template>
  <ion-header>
    <ion-toolbar>
      <div class="" style="display: flex; flex-direction: column;">
        <ion-title>{{ drink.name }}</ion-title>
      </div>

      <ion-buttons slot="end">
        <ion-button @click="cancel" :strong="true">
          <ion-icon slot="icon-only" :icon="close"/>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding" :scroll-y="true">
    <div class="modal-content">
      <ion-img :src="drink.image" class="aesthetic-effect-crt drink-image"></ion-img>
      <ion-label class="citation">{{ drink.citation }}</ion-label>

      <DrinkInformations :drink="drink" class="w-50"/>
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
  IonToolbar,
  modalController,
} from '@ionic/vue';
import {close} from 'ionicons/icons';
import DrinkInformations from '@/views/Drink/DrinkInformations.vue';

const props = defineProps({
  drink: {type: Object, required: true},
});

const cancel = () => modalController.dismiss(null, 'cancel');
// const confirm = () => modalController.dismiss(name.value, 'confirm');
</script>

<style scoped>
.citation {
  margin-left: 16px;
  font-style: italic;
}

.bg-transparent {
  --ion-item-background: transparent;
  background-color: transparent;
}

.w-50 {
  width: 50%;
}

.drink-image {
  max-width: 500px;
}

/* Vos styles pour les écrans d'ordinateurs de haute résolution */
@media (min-width: 1025px) {
  .modal-content {
    display: flex;
    flex-wrap: nowrap;
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
