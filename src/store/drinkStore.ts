// stores/dataStore.js
import { defineStore } from 'pinia';
import drinkService from '@/service/drinkService';

export const useDrinkStore = defineStore('data', {
    state: () => ({
        drinks: [],
    }),
    getters: {
        isLoaded: (state) => state.drinks.length > 0,
    },
    actions: {
        async fetchDrinks() {
            try {
                const response = await drinkService.getAll();
                console.dir('haha');
                this.drinks = response as [];
            } catch (error) {
                console.error(error);
            }
        },
        async init(): Promise<void> {
            const items = await drinkService.getAll();
            this.$state.drinks = items.sort((a: any, b: any) => {
                return a.name.localeCompare(b.name);
            }) as any;
        }
    }
});
