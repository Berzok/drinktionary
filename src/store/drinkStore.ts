// stores/dataStore.js
import { defineStore } from 'pinia';
import drinkService from '@/service/drinkService';
import { Drink } from '@/interfaces/Drink';
import cacheService from '@/service/cacheService';
import { useStore } from '@/store/mainStore';

export const useDrinkStore = defineStore('data', {
    state: () => ({
        drinks: [] as Array<Drink>,
    }),
    getters: {
        isLoaded: (state) => state.drinks.length > 0,
    },
    actions: {
        async fetchDrinks() {
            try {
                this.drinks = await drinkService.getAll();
                useStore().network = true;
                return 'Cocktails mis à jour !';
            } catch (error) {
                useStore().network = false;
                throw new Error('Récupération impossible.');
            }
        },
        cacheResults() {
            console.log('Mise en cache des images');
            this.drinks.forEach(async (drink: Drink) => {
                await cacheService.cacheIcon(drink, `${drink.id}_icon`);
                await cacheService.cacheImage(drink, `${drink.id}_image`);
            });
        },
        async init(): Promise<void> {
            console.dir('Init');
            try {
                this.$state.drinks = await drinkService.getAll();
                this.cacheResults();
            } catch (e) {
                useStore().network = false;
            }
        }
    },
    persist: {
        pick: ['drinks']
    }
});
