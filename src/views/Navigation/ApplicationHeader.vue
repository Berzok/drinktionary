<template>
  <ion-header>
    <ion-toolbar>
      <!--      <ion-buttons slot="start">-->
      <!--        <ion-menu-button></ion-menu-button>-->
      <!--      </ion-buttons>-->

      <div class="glitch">
        <div v-for="i in 10" :key="i" class="line">Drinktionary</div>
      </div>

<!--      <ion-buttons class="filter-button" slot="end">-->
<!--        <ion-icon slot="icon-only" :icon="search"></ion-icon>-->
<!--      </ion-buttons>-->

    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {IonHeader, IonToolbar} from '@ionic/vue';
</script>

<style scoped>
.glitch {
  user-select: none;
}

.filter-button {
  margin-right: 0.5rem;
}
</style>