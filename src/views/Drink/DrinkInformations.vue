<template>
  <ion-list :inset="true" class="ingredients-list">
    <ion-item v-for="dkI in drink.drinkIngredients" :key="dkI.id" class="ingredient">
      <span class="ingredient-name">{{ dkI.ingredient.name }}</span>
      <span slot="end" class="ingredient-quantity">{{ dkI.quantity }} {{ dkI.unit }}</span>
    </ion-item>
  </ion-list>

  <ion-list :inset="true" lines="none" class="instructions-list">
    <ion-item v-for="etape in drink.etapes" :key="etape.step" class="instruction-item">
      {{ etape.content }}
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonItem, IonList } from '@ionic/vue';

const props = defineProps({
    drink: {type: Object, required: true},
});
</script>

<style scoped>
/* Vos styles pour les écrans d'ordinateurs de haute résolution */
@media (min-width: 1025px) {
    .ingredient-name {
        width: 65%;
    }

    .ingredients-list, .instructions-list {
        width: 40%;
        margin-top: 0;
    }

    .instructions-list {
        margin-left: 0;
        margin-right: 0;
    }

    .instruction-item {
        margin-top: 0.75rem;
    }
}

@media only screen and (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2), only screen and (max-width: 768px) and (min-resolution: 192dpi) {
    /* Vos styles pour les téléphones à haute résolution */
}
</style>