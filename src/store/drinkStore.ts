// stores/dataStore.js
import { defineStore } from 'pinia';
import drinkService from '@/service/drinkService';
import { Drink } from '@/interfaces/Drink';

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
                return 'Cocktails mis à jour !';
            } catch (error) {
                throw new Error('Récupération impossible.');
            }
        },
        async init(): Promise<void> {
            this.$state.drinks = await drinkService.getAll();
        }
    },
    persist: {
        pick: ['drinks']
    }
});
