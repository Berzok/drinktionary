<template>
  <!--  <div class="karmotrine-toggle">-->
  <!--    <ion-toggle v-model="withKarmotrine" :checked="true" label-placement="start" :enable-on-off-labels="true"-->
  <!--                class="">Karmotrine-->
  <!--    </ion-toggle>-->
  <!--  </div>-->

  <ion-list :inset="true" class="ingredients-list">
    <ion-item v-for="ingredient in drink.ingredients" :key="ingredient.name" class="ingredient">
      <span class="ingredient-name">{{ ingredient.name }}</span>
      <span slot="end" class="ingredient-quantity">{{ ingredient.quantity }} {{ ingredient.unit }}</span>
    </ion-item>
  </ion-list>

  <ion-list :inset="true" class="instructions-list">
    <ion-item v-for="instruction in drink.instructions" :key="instruction.order">
      {{ instruction.instruction }}
    </ion-item>
  </ion-list>
  <!--  <div style="display: flex; flex-wrap: wrap; flex-direction: row; align-items: center;"></div>-->
</template>

<script setup lang="ts">
import {IonItem, IonList} from '@ionic/vue';
import {ref, Ref} from 'vue';

const props = defineProps({
  drink: {type: Object, required: true},
});

const withKarmotrine: Ref<boolean> = ref(true);
</script>

<style scoped>
.karmotrine-toggle {
  display: flex;
  justify-content: center;
}


/* Vos styles pour les écrans d'ordinateurs de haute résolution */
@media (min-width: 1025px) {
  .ingredient-name {
    width: 65%;
  }


  .ingredients-list, .instructions-list {
    width: 40%;
    align-self: baseline;
  }
}

@media only screen and (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2), only screen and (max-width: 768px) and (min-resolution: 192dpi) {
  /* Vos styles pour les téléphones à haute résolution */
}
</style>