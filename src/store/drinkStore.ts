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
        async loadDrinksFromCache(): Promise<boolean> {
            console.log('Chargement des cocktails depuis le cache.');
            const drinksFromCache = [];

            for (const drink of await drinkService.getAll()) { // On peut adapter cette partie selon tes besoins
                const iconCached = await cacheService.isCached(`${drink.id}_icon`, 'icon');
                const imageCached = await cacheService.isCached(`${drink.id}_image`, 'image');

                if (iconCached && imageCached) {
                    drink.icon = await cacheService.loadCachedIcon(`${drink.id}_icon`);
                    drink.image = await cacheService.loadCachedImage(`${drink.id}_image`);
                    drinksFromCache.push(drink);
                }
            }

            if (drinksFromCache.length > 0) {
                this.drinks = drinksFromCache;
                return true;
            }

            return false;
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

            // Charger depuis le cache si possible
            const isCacheLoaded = await this.loadDrinksFromCache();

            // Si le cache est vide ou incomplet, on récupère les données depuis l'API
            if (!isCacheLoaded) {
                try {
                    await this.fetchDrinks();
                    this.cacheResults();  // Mise en cache après récupération via l'API
                } catch (e) {
                    useStore().network = false;
                    console.error('Erreur lors du chargement des cocktails.');
                }
            }
        }
    },
    persist: {
        pick: ['drinks']
    }
});
