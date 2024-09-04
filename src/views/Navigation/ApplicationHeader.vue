<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <div class="glitch">
        <div v-for="i in 10" :key="i" class="line">Drinktionary</div>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonButtons, IonHeader, IonMenuButton, IonToolbar } from '@ionic/vue';
</script>

<style scoped>
.glitch {
    user-select: none;
}
</style>