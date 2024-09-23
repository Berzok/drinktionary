<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonRippleEffect, modalController } from "@ionic/vue";
import DrinkPage from './Drink/DrinkPage.vue';
import { onMounted, PropType, ref, watch } from 'vue';
import cacheService from '@/service/cacheService';
import { useStore } from '@/store/mainStore';
import { Drink } from '@/interfaces/Drink';
import placeholder from '@/assets/images/placeholder.svg';

const message = ref('This modal example uses the modalController to present and dismiss modals.');
const apiUrl = process.env.VITE_API_URL;

const props = defineProps({
    drink: {
        type: Object as PropType<Drink>,
        required: true
    },
});
const iconSrc = ref('');

const loadIcon = async (drink: Drink) => {
    try {
        return await cacheService.loadCachedIcon(drink.id + '_icon');
    } catch (e) {
        console.error('Error while loading cached icon');
        if (useStore().network) {
            return apiUrl + '/uploads/images/' + drink.icon;
        } else {
            return placeholder;
        }
    }
}

// Charger l'icône lors du montage du composant
onMounted(async () => {
    iconSrc.value = await loadIcon(props.drink);
});

// Surveiller les changements de la prop `drink`
watch(() => props.drink, async (newDrink) => {
    iconSrc.value = await loadIcon(newDrink);
}, {immediate: true});

const openModal = async () => {
    const modal = await modalController.create({
        cssClass: 'customModal',
        component: DrinkPage,
        componentProps: {
            drink: props.drink
        },
        mode: 'md'
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
        message.value = `Hello, ${data}!`;
    }
};
</script>

<template>
  <ion-card class="item-link ion-activatable" @click="openModal">
    <ion-ripple-effect class="custom-ripple"/>

    <img :alt="drink.description" class="drink-icon" :src="iconSrc"/>
    <ion-card-header>
      <ion-card-title class="ion-text-center drink-name">{{ drink.name }}</ion-card-title>
    </ion-card-header>
  </ion-card>
</template>

<style scoped>
.item-link {
    align-self: auto;
    cursor: pointer;
    transition-duration: 0.45s;
}

/* Vos styles pour les écrans d'ordinateurs de haute résolution */
@media only screen and (min-width: 1025px) {
    .drink-icon {
        max-width: 200px;
    }

    .custom-ripple {
        color: chartreuse;
    }
}
</style>

<style>
ion-modal.customModal {
    --width: 54%;
}

@media only screen and (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2), only screen and (max-width: 768px) and (min-resolution: 192dpi) {
    /* Vos styles pour les téléphones à haute résolution */
    ion-modal.customModal {
        --width: 100%;
    }

    .drink-name {
        font-size: 5vw;
    }
}

</style>