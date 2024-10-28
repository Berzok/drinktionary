<template>
  <ion-header>
    <ion-toolbar>
      <div class="glitch">
        <div v-for="i in 10" :key="i" class="line">Drinktionary</div>
      </div>

      <ion-buttons class="filter-button" slot="end">
        <ion-button @click="handleRefresh" :strong="true">
          <ion-icon slot="icon-only" :icon="refresh"></ion-icon>
        </ion-button>
      </ion-buttons>

    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonButton, IonHeader, IonIcon, IonToolbar, toastController } from '@ionic/vue';
import { refresh } from 'ionicons/icons';
import { useDrinkStore } from '@/store/drinkStore';

const handleRefresh = () => {
    setTimeout(async () => {
        // Any calls to load data go here
        try {
            const response = await useDrinkStore().fetchDrinks();
            await presentToast(response, 'success');
        } catch (error) {
            const e: Error = error as Error;
            await presentToast(e.message, 'danger');
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

<style scoped>
.glitch {
  user-select: none;
}

.filter-button {
  margin-right: 0.5rem;
}
</style>